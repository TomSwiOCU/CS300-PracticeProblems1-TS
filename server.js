/**
 * Index.js think file that runs the whole server
 * 
 * Main entry point for the Blog RESTful API application
 * Configures Express server, middleware, routes, and database connection
 */

const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');
const postRoutes = require('./routes/postRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Initialize Express application
const app = express();

// Get port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

/**
 * Middleware Configuration
 * 
 * Middleware functions execute in order for each request
 */

// Parse incoming JSON request bodies
// Makes req.body available with parsed JSON data
app.use(express.json());

// Parse URL-encoded request bodies (form data)
// Extended: true allows for rich objects and arrays
app.use(express.urlencoded({ extended: true }));

/**
 * Route Configuration
 * 
 * Mount route handlers at specific paths
 */

// Mount post routes at /api/posts
// All routes defined in postRoutes will be prefixed with /api/posts
app.use('/api/posts', postRoutes);

/**
 * Health Check Endpoint
 * 
 * Simple endpoint to verify server is running
 * Useful for monitoring and load balancers
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

/**
 * Error Handling Middleware
 * 
 * Must be defined AFTER all routes
 * notFound catches undefined routes, errorHandler catches errors
 */

// Catch requests to undefined routes (404)
app.use(notFound);

// Global error handler for all errors
app.use(errorHandler);

/**
 * Server Initialization
 * 
 * Async function to:
 * 1. Test database connection
 * 2. Synchronize database schema
 * 3. Start Express server
 */
const startServer = async () => {
  try {
    // Step 1: Test database connection
    await testConnection();
    
    // Step 2: Sync database schema with models
    // Creates tables if they don't exist or updates them if needed
    await syncDatabase();
    
    // Step 3: Start listening for HTTP requests
    app.listen(PORT, () => {
      console.log(`✓ Server is running on port ${PORT}`);
      console.log(`✓ API available at http://localhost:${PORT}/api/posts`);
    });
  } catch (error) {
    // If startup fails, log error and exit process
    console.error('Failed to start server:', error);
    process.exit(1); // Exit with error code
  }
};

// Start the server
startServer();

// Export app for testing purposes
module.exports = app;