/**
 * Schema for comment replies
 */

const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    user: String, 

    body: {
        type: String,
        required: true,
        trim: true
    },

    likes: {
        type: Number, 
        required: true
    },
    comment: String
}, {
   timestamps: true 
});

const reply = mongoose.model("Reply", replySchema);
module.exports = reply;