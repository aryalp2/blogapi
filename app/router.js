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

    // Get a new blog post
    blogPostRoutes.get('/', BlogController.getPost);

    // get a new blog by id
    blogPostRoutes.get('/:id', BlogController.getPostById);

    // delete a blog by id
    blogPostRoutes.delete('/delete/:id', BlogController.deletePostById);

    // patch a blog by id
    blogPostRoutes.patch('/update/:id', BlogController.updatePostById);

    // url for all API routes
    app.use('/api', apiRoutes);
};