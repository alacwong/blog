/**
 * Schema for Blog comments
 */

const mongoose = require('mongoose');
let Blog  = require("../models/blog");
let User = require("../models/User");

function validateUser(userId){
    User.findById(userId)
        .then(user => true)
        .catch(err => false);
}

function validateBlog (id){
    Blog.findById(id)
        .then(blog => true)
        .catch (err => false);
}

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        validate: [validateUser, "User not found"]
    } ,

    body: {
        type: String,
        required: true,
        trim: true
    },

    likes: {
        type: Number, 
        required: true
    },

    replies: [String],
    blog: {
        type: String,
        validate: [validateBlog, "Blog not found"]
    }
}, {
   timestamps: true 
});

const comment = mongoose.model("Comment", commentSchema);
module.exports = comment;