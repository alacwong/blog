/**
 * Schema for Blog comments
 */

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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

    replies: [
        {
            user: String, 
        
            body: {
                type: String,
                required: true,
                trim: true
            },
        
            likes: {
                type: Number, 
                required: true
            }
        }
    ],
    blog: String
}, {
   timestamps: true 
});

const comment = mongoose.model("Comment", commentSchema);
module.exports = comment;