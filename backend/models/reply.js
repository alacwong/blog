/**
 * Schema for comment replies
 */

const mongoose = require('mongoose');

let Comment  = require("../models/comment");
function validateId (id){
    Comment.findById(id)
        .then(blog => true)
        .catch (err => false);
}

let User = require("../models/User");

function validateUser(userId){
    User.findById(userId)
        .then(user => true)
        .catch(err => false);
}

const replySchema = new mongoose.Schema({
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

    comment: {
        type: String,
        validate: [validateId, "Comment not found"]
    }
    
}, {
   timestamps: true 
});

const reply = mongoose.model("Reply", replySchema);
module.exports = reply;