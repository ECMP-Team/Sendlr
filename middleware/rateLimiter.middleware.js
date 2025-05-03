import { redisClient } from "../utils/redisUtils.js";

const RATE_LIMIT_PREFIX = "ratelimit:";
const MAX_REQUESTS = {
  login: 5, // 5 login attempts
  register: 3, // 3 registration attempts
  default: 30, // 30 requests for other endpoints
};
const WINDOW_MS = {
  login: 60 * 5, // 5 minutes for login
  register: 60 * 15, // 15 minutes for registration
  default: 60, // 1 minute for other endpoints
};

/**
 * Rate limiter middleware to protect against brute force attacks
 * @param {string} type - Type of rate limit (e.g., 'login', 'register')
 * @returns {Function} Express middleware
 */
export const rateLimiter = (type = "default") => {
  return async (req, res, next) => {
    try {
      // Get client IP address or other identifier
      const clientIP = req.ip || req.headers["x-forwarded-for"] || "unknown";

      // Create unique key for this rate limit
      const key = `${RATE_LIMIT_PREFIX}${type}:${clientIP}`;

      // Get current count from Redis
      const current = await redisClient.get(key);
      const count = current ? parseInt(current) : 0;

      // Get limits based on type
      const maxRequests = MAX_REQUESTS[type] || MAX_REQUESTS.default;
      const windowMs = WINDOW_MS[type] || WINDOW_MS.default;

      if (count >= maxRequests) {
        // Rate limit exceeded
        return res.status(429).json({
          success: false,
          message: "Too many requests, please try again later.",
          retryAfter: windowMs,
        });
      }

      // Increment the counter
      await redisClient.incr(key);

      // Set expiry if key is new
      if (count === 0) {
        await redisClient.expire(key, windowMs);
      }

      // Add rate limit headers
      res.setHeader("X-RateLimit-Limit", maxRequests);
      res.setHeader("X-RateLimit-Remaining", maxRequests - count - 1);

      next();
    } catch (error) {
      console.error("Rate limiter error:", error);
      // In case of error, allow the request to proceed
      next();
    }
  };
};

export default rateLimiter;
