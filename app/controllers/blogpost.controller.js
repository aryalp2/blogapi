"use strict"
const blogpostModel = require('../models/blogpost.model');
const BlogPost = require('../models/blogpost.model');

// Create a new blog post
exports.publishPost = (req, res) => {
    // const theURL = req.body.title.toLowerCase().split(' ').join('-');
    console.log(req.body)
    // req.body['url'] = theURL;
    const NewBlogPost = new BlogPost(req.body);

    NewBlogPost.save((err, blogPost) => {
        if(err) {
            return res.status(422).json({
            msg: 'Server encountered an error publishing blog post.',
            error: err
            });
        }
        else {
            return res.status(200).json({
            msg: 'Successfully published blog post.',
            blogPost: blogPost
            });
        }
        });
    };

exports.getPost = (req, res) => {
    // const newBlog = new BlogPost();
    return BlogPost.find((err, blog) => {
        if (err){
            res.status(404).json({
                msg: 'Server encountered error'
            });
        } else {
            res.json(blog);
        }
    })
}

exports.getPostById = (req, res) => {
    return BlogPost.findById(req.params.id, (err, blog) => {
        if (err) {
            res.status(404).json({
                msg: 'Server encountered error loading the blog'
            });
        } else {
            res.json({
                'url': blog.url,
                'id': blog.id,
                'title': blog.title,
                'body':blog.body,
                'date': blog.date
            });
        }
    });
}

exports.deletePostById = (req, res) => {
    return BlogPost.findByIdAndDelete(req.params.id, (err, blogPost) => {
        if (err) {
            res.status(404).json({
                msg: 'Server encountered error loading the blogPost'
            });
        } else {
            res.json({
                msg: `Successfully deleted ${blogPost.title}`
            });
        }
    });
}

exports.updatePostById = (req, res) => {
    return BlogPost.findByIdAndUpdate(req.params.id, req.body, (err, updatePost) => {
        if (err) {
            res.status(404).json({
                msg: "Server encountered error during updating"
            });
        } else {
            res.json({
                msg: `Successfully updated ${updatePost.title}`
            })
        }
    });
}