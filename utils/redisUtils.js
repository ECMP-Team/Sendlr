import Redis from "ioredis";

// Redis configuration from environment variables
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD || "",
  db: parseInt(process.env.REDIS_DB || "0"),
});

// Define key prefixes for better organization
const KEY_PREFIX = process.env.REDIS_PREFIX || "sendlr:";
const BLACKLIST_PREFIX = `${KEY_PREFIX}blacklist:`;
const REFRESH_TOKEN_PREFIX = `${KEY_PREFIX}refresh:`;
const USER_SESSION_PREFIX = `${KEY_PREFIX}session:`;
const USER_DATA_PREFIX = `${KEY_PREFIX}user:`;

// Default TTL for cached items (24 hours in seconds)
const DEFAULT_TTL = parseInt(process.env.REDIS_TTL || "86400");

// Connection event handlers
redisClient.on("connect", () => {
  console.log("🔌 Connected to Redis server");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

// Token blacklisting
/**
 * Add a token to the blacklist
 * @param {string} token - JWT token to blacklist
 * @param {number} expiryTime - Token expiry time in seconds
 */
export async function blacklistToken(token, expiryTime) {
  try {
    await redisClient.set(`${BLACKLIST_PREFIX}${token}`, "1", "EX", expiryTime);
    return true;
  } catch (error) {
    console.error("Error blacklisting token:", error);
    return false;
  }
}

/**
 * Check if a token is blacklisted
 * @param {string} token - JWT token to check
 * @returns {Promise<boolean>} - True if token is blacklisted
 */
export async function isTokenBlacklisted(token) {
  try {
    const result = await redisClient.exists(`${BLACKLIST_PREFIX}${token}`);
    return result === 1;
  } catch (error) {
    console.error("Error checking token blacklist:", error);
    return false;
  }
}

// Refresh token management
/**
 * Store a refresh token for a user
 * @param {string} userId - User ID
 * @param {string} refreshToken - Refresh token
 * @param {string} deviceInfo - Information about the device/browser
 * @param {number} ttl - Time to live in seconds
 */
export async function storeRefreshToken(userId, refreshToken, deviceInfo, ttl) {
  try {
    const sessionInfo = JSON.stringify({
      refreshToken,
      deviceInfo,
      createdAt: new Date().toISOString(),
    });

    // Add to user's session set
    await redisClient.hset(
      `${USER_SESSION_PREFIX}${userId}`,
      refreshToken,
      sessionInfo
    );

    // Set expiry on the refresh token
    await redisClient.set(
      `${REFRESH_TOKEN_PREFIX}${refreshToken}`,
      userId,
      "EX",
      ttl
    );

    return true;
  } catch (error) {
    console.error("Error storing refresh token:", error);
    return false;
  }
}

/**
 * Validate a refresh token
 * @param {string} refreshToken - Refresh token to validate
 * @returns {Promise<string|null>} - User ID if token is valid
 */
export async function validateRefreshToken(refreshToken) {
  try {
    return await redisClient.get(`${REFRESH_TOKEN_PREFIX}${refreshToken}`);
  } catch (error) {
    console.error("Error validating refresh token:", error);
    return null;
  }
}

/**
 * Remove a refresh token
 * @param {string} userId - User ID
 * @param {string} refreshToken - Refresh token to remove
 */
export async function removeRefreshToken(userId, refreshToken) {
  try {
    // Remove from user's session set
    await redisClient.hdel(`${USER_SESSION_PREFIX}${userId}`, refreshToken);

    // Delete the refresh token
    await redisClient.del(`${REFRESH_TOKEN_PREFIX}${refreshToken}`);

    return true;
  } catch (error) {
    console.error("Error removing refresh token:", error);
    return false;
  }
}

/**
 * Get all active sessions for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of session info objects
 */
export async function getUserSessions(userId) {
  try {
    const sessions = await redisClient.hgetall(
      `${USER_SESSION_PREFIX}${userId}`
    );
    return Object.values(sessions).map((session) => JSON.parse(session));
  } catch (error) {
    console.error("Error getting user sessions:", error);
    return [];
  }
}

/**
 * Clear all sessions for a user
 * @param {string} userId - User ID
 */
export async function clearUserSessions(userId) {
  try {
    // Get all refresh tokens for the user
    const sessions = await redisClient.hgetall(
      `${USER_SESSION_PREFIX}${userId}`
    );

    // Delete each refresh token
    const refreshTokens = Object.keys(sessions || {});
    for (const token of refreshTokens) {
      await redisClient.del(`${REFRESH_TOKEN_PREFIX}${token}`);
    }

    // Delete the session hash
    await redisClient.del(`${USER_SESSION_PREFIX}${userId}`);

    return true;
  } catch (error) {
    console.error("Error clearing user sessions:", error);
    return false;
  }
}

// User data caching
/**
 * Cache user data
 * @param {string} userId - User ID
 * @param {Object} userData - User data to cache
 * @param {number} ttl - Time to live in seconds (optional)
 */
export async function cacheUserData(userId, userData, ttl = DEFAULT_TTL) {
  try {
    await redisClient.set(
      `${USER_DATA_PREFIX}${userId}`,
      JSON.stringify(userData),
      "EX",
      ttl
    );
    return true;
  } catch (error) {
    console.error("Error caching user data:", error);
    return false;
  }
}

/**
 * Get cached user data
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} - Cached user data
 */
export async function getCachedUserData(userId) {
  try {
    const data = await redisClient.get(`${USER_DATA_PREFIX}${userId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting cached user data:", error);
    return null;
  }
}

/**
 * Remove cached user data
 * @param {string} userId - User ID
 */
export async function removeCachedUserData(userId) {
  try {
    await redisClient.del(`${USER_DATA_PREFIX}${userId}`);
    return true;
  } catch (error) {
    console.error("Error removing cached user data:", error);
    return false;
  }
}

// Expose redis client for other specialized operations
export { redisClient };

export default {
  blacklistToken,
  isTokenBlacklisted,
  storeRefreshToken,
  validateRefreshToken,
  removeRefreshToken,
  getUserSessions,
  clearUserSessions,
  cacheUserData,
  getCachedUserData,
  removeCachedUserData,
  redisClient,
};
