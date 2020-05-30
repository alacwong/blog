/**
 * Schema for Blogs
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

    title: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50, 
        trim: true
    }, 

    comments : [
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
            ]    
        }
    ]
}, {
   timestamps: true 
});

const blog = mongoose.model("Blog", commentSchema);
module.exports = blog;