/**
 * Error Handling Middleware
 * 
 * Centralized error handling for the Express application
 * Must be placed AFTER all routes in the middleware chain
 */

/**
 * Global Error Handler
 * 
 * Catches all errors passed via next(error) from any route
 * Provides consistent error response format across the API
 * 
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log error to console for debugging
  console.error('Error:', err);
  
  // Determine status code
  // If response already has a status code set, use it; otherwise default to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  // Send error response
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    // Only include stack trace in development environment for security
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

/**
 * 404 Not Found Handler
 * 
 * Catches all requests to undefined routes
 * Must be placed BEFORE the global error handler
 * 
 * Parameters
 * req - Express request object
 * res - Express response object
 * next - Express next middleware function
 */
const notFound = (req, res, next) => {
  // Return 404 error for any route that wasn't matched
  res.status(404).json({ error: 'Route not found' });
};

// Export both middleware functions
module.exports = { errorHandler, notFound };