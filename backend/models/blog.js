/**
 * Schema for Blogs
 */

const mongoose = require('mongoose');

let User = require("../models/User");

function validateUser(userId){
    User.findById(userId)
        .then(user => true)
        .catch(err => false);
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

    title: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50, 
        trim: true
    }, 

    comments : [String]
}, {
   timestamps: true 
});

const blog = mongoose.model("Blog", commentSchema);
module.exports = blog;