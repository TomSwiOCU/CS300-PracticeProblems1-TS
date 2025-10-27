/**
 * Post Routes
 *
 * Defines all the API endpoints for post-related activities.
 *
 * Each route will be map an HTTP method and URL
 * pattern/slug to a controller function
 *
 * Router Pattern:
 * Routes will be mounted at '/api/posts' in server.js
 * So '/' here will become '/api/posts' in the full URL
 *
 * EX: '/:id' here becomes '/api/posts/:id' in the full URL
 *
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Get /api/posts
// get all blog posts
// Controller: getAllPosts
router.get('/', postController.getAllPosts);

// Get /api/posts/:id
// Get a single post by the ID number
// URL Param: id (number) - post ID
// Controller: getPostById
router.get('/:id', postController.getPostById);

// POST /api/posts
// Create a new blog post
// Req Body: { title, content, author}
// Controller: createPost
router.post('/', postController.createPost);

// PUT /api/posts/:id
// Update an entire post (replacing all fields)
// URL Param: id (number) - Post Id
// Req Body: { title, content, author, published}
// Controller: updatePost
router.put('/:id', postController.updatePost);

// PATCH /api/posts/:id/publish
// Toggles the published status of a post
// URL Param: id (number) - Post Id
// No Req Body
// Controller: togglePublish
router.patch('/:id/publish', postController.togglePublish);

// DELETE /api/posts/:id
// Delete a post
// URL Param: id (number) - Post Id
// Controller: deletePost
router.delete('/:id', postController.deletePost);

// Export router to be usable in other parts of application
module.exports = router;