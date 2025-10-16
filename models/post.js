/**
 * Post model
 * 
 * Defines the structure and validationg rules for blog posts (post table)
 * uses Sequelize ORM (Object Relationial Mapper(ORM))
 * 
 * 
 */

const { DataTypes } = require ('sequelize');
const { sequelize } = require('../config/database');

/**
 * 
 * Post Model Definition
 * 
 * Represents a blog post with a title, content, author , and publish status
 * 
 * Includes validation rules for all fields
 * 
 */