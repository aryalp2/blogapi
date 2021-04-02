const express = require('express');

const BlogController = require('./controllers/blogpost.controller');

module.exports = app => {
    // route groups
    const apiRoutes = express.Router();
    const blogPostRoutes = express.Router();

    // middleware for api routes
    apiRoutes.use('/blogPosts', blogPostRoutes);

    // Blog Post Routes
    // POST a new blog post
    blogPostRoutes.post('/', BlogController.publishPost);

    // Blog Post Routes
    // Get a new blog post
    blogPostRoutes.get('/', BlogController.getPost);

    // url for all API routes
    app.use('/api', apiRoutes);
};