/**
 * Models Index
 * 
 * Centralized export point for all database (DB) models
 * Handles db synchronization
 * 
 */

const { sequelize } = require('../config/database');
const Post = require ('./post');

/**
 * Sync DB schema with models
 * 
 * Creates or updates db tables to match table definitions
 * Use { alter: true } to modify existing tables /wo dropping tables
 * 
 * ALT OPTIONS
 * { force: true } - Drop and recreate the tables (ALL DATA LOST)
 * {alter: true } - Modifies tables to match models (SAFER; KEEPS DATA)
 * 
 */
const syncDatabase = async () => {

    try {
        //  Sync all models with database
        await sequelize.sync({ alter: true})
        console.log('Database synced succesfully.');
    } catch (error){
        console.error('Error sync database:', error);
    }
};

// Export  all models and database utilities
module.export = {
    // Post model
    Post,
    // Function to sync db schema
    syncDatabase
};