/**
 * Database Config File
 * 
 * File should setup Sequelize connection to the db.
 * Uses local sqlite db for local development purposes can easile be 
 * converted to PostgreSQL, MySQL, MariaDB, MS SQL Server, etc.
 * 
 */

const { Sequelize } = require('sequelize');
// Load env vars from the .env file
require('dotenv').config();

/**
 * Create sequelize instance with config
 * 
 * Options:
 * dialect: Type of DB (sqlite, postgres,mysql ,etc.)
 * storage: location of SQLite DB file
 * logging: Set to console.Log to see SQL queries, Set to False Disable
 * define: Default options for all models 
 *         -timestamps
 *         -underscored
 * 
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_storage || './database.sqlite',
    logging: false,
    define: {
        timestamps: true,
        underscored: false,
    }
})

/**
 * Test database connection
 * 
 * Attempt to auth with the database and log result
 * 
 * 
 */
const testConnection = async() =>{
    try{
        await sequelize.authenticate();
        console.log('Database connection established succesfully.')
    } catch (error){
        console.log('Unable to connect to the database', error);
    }
}

// Export sequelize instance and tes function for use in
// other parts of this API
module.exports = {sequelize, testConnection}