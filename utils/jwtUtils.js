import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import crypto from "crypto";

/**
 * Create an access token
 * @param {Object} payload - Token payload
 * @returns {string} - JWT access token
 */
const createAccessToken = (payload) => {
  const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "15m";
  return jwt.sign(payload, JWT_SECRET, { expiresIn: accessTokenExpiry });
};

/**
 * Create a refresh token
 * @param {Object} payload - Token payload
 * @returns {string} - JWT refresh token
 */
const createRefreshToken = (payload) => {
  const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || "7d";

  // Add a random suffix to the payload to make the token unique
  const jti = crypto.randomBytes(16).toString("hex");
  const refreshPayload = { ...payload, jti };

  return jwt.sign(refreshPayload, JWT_SECRET, {
    expiresIn: refreshTokenExpiry,
  });
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} - Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

/**
 * Calculate token expiry in seconds
 * @param {string} expiresIn - Token expiry string (e.g., '15m', '7d')
 * @returns {number} - Expiry time in seconds
 */
const getTokenExpirySeconds = (expiresIn) => {
  const units = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
    w: 7 * 24 * 60 * 60,
  };

  const match = expiresIn.match(/^(\d+)([smhdw])$/);
  if (!match) {
    // Default to 1 day if format is not recognized
    return 24 * 60 * 60;
  }

  const [, value, unit] = match;
  return parseInt(value) * units[unit];
};

// For backward compatibility
const createToken = createAccessToken;

export {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  getTokenExpirySeconds,
  createToken, // Keep for backward compatibility
};
