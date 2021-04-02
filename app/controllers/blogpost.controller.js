"use strict"
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
            console.log("a");
            res.json(blog);
        }
    })
}
