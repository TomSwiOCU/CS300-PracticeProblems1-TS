/**
 * Post Controller
 * 
 * Contains all 'business' logic for handling blog post operations
 * Each function handles a specific API endpoint with proper error handling
 */

const { Post } = require('../models');

/**
 * Get All Posts
 * 
 * Retrieves all blog posts from the database
 * Ordered by creation date (newest first)
 * 
 * route GET /api/posts
 * accessible via Public
 * return Array of all post objects
 */
const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts, ordered by most recent first
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    // Return posts with 200 OK status
    res.status(200).json(posts);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

/**
 * Get Post by ID
 * 
 * Retrieves a single blog post by its ID
 * Returns 404 if post doesn't exist
 * 
 * Route GET /api/posts/:id
 * accessible via Public
 * param id - Post ID from URL parameter
 * returns Post object if found
 */
const getPostById = async (req, res) => {
  try {
    // Extract ID from URL parameters
    const { id } = req.params;
    
    // Find post by primary key (ID)
    const post = await Post.findByPk(id);
    
    // If post doesn't exist, return 404 error
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Return the post with 200 OK status
    res.status(200).json(post);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

/**
 * Create New Post
 * 
 * Creates a new blog post with provided data
 * Validates that all required fields are present
 * 
 * Route POST /api/posts
 * accessible via Public
 * param title - Post title (required)
 * param content - Post content (required)
 * param author - Post author (required)
 * returns {Object} Created post object with 201 status
 */
const createPost = async (req, res) => {
  try {
    // Extract fields from request body
    const { title, content, author } = req.body;
    
    // Manual validation: Check if all required fields are present
    // This catches missing fields before they reach Sequelize
    if (!title || !content || !author) {
      return res.status(400).json({ 
        error: 'All fields are required: title, content, author' 
      });
    }
    
    // Create new post in database
    // Sequelize will also validate field constraints (length, etc.)
    const post = await Post.create({
      title,
      content,
      author
      // published defaults to false (set in model)
    });
    
    // Return created post with 201 Created status
    res.status(201).json(post);
  } catch (error) {
    // Handle Sequelize validation errors (e.g., title too long)
    if (error.name === 'SequelizeValidationError') {
      // Extract validation error messages
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    
    // Handle any other unexpected errors
    res.status(500).json({ error: 'Failed to create post' });
  }
};

/**
 * Update Post
 * 
 * Updates an existing post with new data
 * Can update any or all fields (title, content, author, published)
 * 
 * Route PUT /api/posts/:id
 * accessible via Public
 * param id - Post ID from URL parameter
 * param title - Updated title (optional)
 * param content - Updated content (optional)
 * param author - Updated author (optional)
 * param published - Updated publish status (optional)
 * returns Updated post object
 */
const updatePost = async (req, res) => {
  try {
    // Extract ID from URL parameters
    const { id } = req.params;
    
    // Find the post to update
    const post = await Post.findByPk(id);
    
    // If post doesn't exist, return 404 error
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Extract updated fields from request body
    const { title, content, author, published } = req.body;
    
    // Update post with new values
    // If a field is undefined (not provided), keep the existing value
    await post.update({
      title: title !== undefined ? title : post.title,
      content: content !== undefined ? content : post.content,
      author: author !== undefined ? author : post.author,
      published: published !== undefined ? published : post.published
    });
    
    // Return updated post with 200 OK status
    res.status(200).json(post);
  } catch (error) {
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    
    // Handle any other unexpected errors
    res.status(500).json({ error: 'Failed to update post' });
  }
};

/**
 * Toggle Publish Status
 * 
 * Toggles the published status of a post
 * If published is true, sets it to false and vice versa
 * 
 * Route PATCH /api/posts/:id/publish
 * accessible via Public
 * param id - Post ID from URL parameter
 * returns Updated post object with toggled status
 */
const togglePublish = async (req, res) => {
  try {
    // Extract ID from URL parameters
    const { id } = req.params;
    
    // Find the post to update
    const post = await Post.findByPk(id);
    
    // If post doesn't exist, return 404 error
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Toggle the published status
    // If currently true, set to false; if false, set to true
    await post.update({
      published: !post.published
    });
    
    // Return updated post with 200 OK status
    res.status(200).json(post);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ error: 'Failed to toggle publish status' });
  }
};

/**
 * Delete Post
 * 
 * Permanently deletes a post from the database
 * Returns 204 No Content on success (no response body)
 * 
 * Route DELETE /api/posts/:id
 * accessible via Public
 * param id - Post ID from URL parameter
 * returns 204 No Content status on success
 */
const deletePost = async (req, res) => {
  try {
    // Extract ID from URL parameters
    const { id } = req.params;
    
    // Find the post to delete
    const post = await Post.findByPk(id);
    
    // If post doesn't exist, return 404 error
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Delete the post from database
    await post.destroy();
    
    // Return 204 No Content (successful deletion, no response body)
    res.status(204).send();
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Export all controller functions for use in routes
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  togglePublish,
  deletePost
};