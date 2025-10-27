/**
 * Database Config File
 *
 * File should setup the Sequelize connection to the db.
 *
 * Uses local sqlite db for local development purposes can easily be
 * converted to PostgreSQL, MySQL, MariaDB, MS SQL Server, etc.
 *
 */

const {Sequelize} = require('sequelize');
//Load env vars from the .env file
require('dotenv').config();

/**
 * Create sequelize instace with config
 *
 * Options:
 * dialect: Type of DB (sqlite, postgres, mysql, etc.)
 * storage: Location of SQLite DB file
 * Logging: Set to console.log to see SQL queries, Set to False to Disable
 * define: Default options for all models
 *      -timestamps
 *      -underscored
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_Storage || './database.sqlite',
    logging: false,
    define: {
        timestamps: true,
        underscored: false,
    }
});

/**
 * Test database connection
 *
 * Attempt to auth with the database and log result
 *
 */
const testConnection = async() => {
    try{
        await sequelize.authenticate();
        console.log('Datebase connection established successfully.');
    }catch(error){
        console.error('Unable to connect to the database', error);
    }
};

//Export sequelize instance and test function for use in other parts of this API
module.exports = {sequelize, testConnection}