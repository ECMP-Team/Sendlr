/**
 * Error handling middleware for consistent API error responses
 */

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  
  // Check for specific error types
  let statusCode = 500;
  let message = 'Server Error';

  // Handle JWT validation errors 
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication failed';
  }
  
  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    // Unique constraint violations
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'Resource already exists';
    }
    // Record not found
    if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Resource not found';
    }
  }
  
  // Format response
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' ? { error: err.message, stack: err.stack } : {})
  });
};

export { errorHandler }; 