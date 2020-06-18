const router = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/blog");
const Comment = require("../models/comment");


const updateBlog = (blogId, commentId) =>{
    Blog.findById(blogId)
        .then(blog => {
            blog.comments.push(commentId)
            blog.save()
            console.log("Blog has been saved")
        });
}

const updateComment = (commentId, replyId) => {
    Comment.findById(commentId)
        .then(comment => {
            comment.replies.push(replyId)
            comment.save();
            console.log("Comment has been save");
        });
}

/**
 * Post request start
 */

router.route("/blog").post((req, res) =>{
    console.log("attempting to blog...")
    console.log(req.body);
    const newBlog = new Blog({
        user: req.body.user,
        body: req.body.body,
        title: req.body.title,
        comments: [],
        likes: 0
    });

    newBlog.save()
        .then(blog => {
            User.findById(blog.user)
                .then(user => {
                    user.blogs.push(blog._id)
                    user.save();
                    res.json('blog added')
                })
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});


router.route("/comment").post((req, res) =>{
    const newComment = new Comment({
        user: req.body.user,
        body: req.body.body,
        blog: req.blog._id, 
        replies: [],
        likes: 0
    });

    newComment.save()
        .then(comment =>{
            updateBlog(comment.blog, comment._id);
            res.json("Comment added!");
        })
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.route("/reply").post((req, res) =>{
    const newReply= new Reply( {
        user: req.body.user,
        body: req.body.body,
        comment: req.body.comment,
        likes: 0
    });

    newReply.save()
        .then(reply => {
            updateComment(reply.comment, reply._id);
            res.json("Added reply");
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});


module.exports = router;
