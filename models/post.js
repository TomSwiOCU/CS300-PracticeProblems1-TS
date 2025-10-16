/**
 * Post Model
 * 
 * Defines the structure and validation rules for blog posts
 * using Sequelize ORM
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Post Model Definition
 * 
 * Represents a blog post with title, content, author, and publish status
 * Includes comprehensive validation rules for all fields
 */
const Post = sequelize.define('Post', {
  // Primary key field
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true     // Automatically increment for each new post
  },
  
  // Title field limited to 200 characters
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,       // Cannot be null
    validate: {
      // Validation Title must be provided
      notNull: {
        msg: 'Title is required'
      },
      // Validation Title cannot be empty string
      notEmpty: {
        msg: 'Title cannot be empty'
      },
      // Validation Title length must be between 1-200 characters
      len: {
        args: [1, 200],
        msg: 'Title must be between 1 and 200 characters'
      }
    }
  },
  
  // Content field unlimited text length
  content: {
    type: DataTypes.TEXT,
    // Cannot be null
    allowNull: false,       
    validate: {
      // Validation Content must be provided
      notNull: {
        msg: 'Content is required'
      },
      // Validation Content cannot be empty string
      notEmpty: {
        msg: 'Content cannot be empty'
      }
    }
  },
  
  // Author field
  author: {
    type: DataTypes.STRING,
    // Cannot be null
    allowNull: false,       
    validate: {
      // Validation Author must be provided
      notNull: {
        msg: 'Author is required'
      },
      // Validation Author cannot be empty string
      notEmpty: {
        msg: 'Author cannot be empty'
      }
    }
  },
  
  // Published status which indicates if post is publicly visible
  published: {
    type: DataTypes.BOOLEAN,
    // Default to unpublished when created
    defaultValue: false     
  }
}, {
  // Model options
  // Explicit table name in database
  tableName: 'posts', 
   // Enable createdAt and updatedAt fields      
  timestamps: true         
});

// Export the Post model for use in other files
module.exports = Post;