/**
 * Standard success response formatter
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {Object} data - Response data
 * @param {number} statusCode - HTTP status code (default: 200)
 */
export function sendSuccess(res, message, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data
  });
}

/**
 * Standard error response formatter
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {Object} error - Error details
 * @param {number} statusCode - HTTP status code (default: 400)
 */
export function sendError(res, message, error = {}, statusCode = 400) {
  console.error(`API Error: ${message}`, error);
  
  return res.status(statusCode).json({
    success: false,
    message,
    ...(Object.keys(error).length > 0 && { error })
  });
}

/**
 * Not found response formatter
 * @param {Object} res - Express response object
 * @param {string} message - Not found message
 */
export function sendNotFound(res, message = "Resource not found") {
  return sendError(res, message, {}, 404);
}

/**
 * Server error response formatter
 * @param {Object} res - Express response object
 * @param {Error} error - Error object
 * @param {string} message - Error message override
 */
export function sendServerError(res, error, message = "Internal server error") {
  return sendError(res, message, { details: error.message }, 500);
} 