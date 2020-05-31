const router = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const updateUser = (userId, blogId) =>{
    User.findById(userId)
        .then(user => user.blogs.push(blogId));
}

const updateBlog = (blogId, commentId) =>{
    Blog.findById(blogId)
        .then(blog => blog.comments.push(commentId));
}

const updateComment = (commentId, replyId) => {
    Comment.findById(commentId)
        .then(comment => comment.replies.push(replyId));
}

router.route("/blog").post((req, res) =>{
    const newBlog = {
        user: req.body.user,
        body: req.body.user,
        title: req.body.user,
        comments: [],
        likes: 0
    }
});


router.route("/comment").post((req, res) =>{
    const newComment = {
        user: req.body.user,
        body: req.body.user,
        blog: req.blog._id, 
        replies: [],
        likes: 0
    }

    newComment.save()
        .then(comment => updateBlog(comment.blog, comment._id))
        .catch(err => console.log(`Error ${err}`));

});

router.route("/reply").post((req, res) =>{
    const newReply= {
        user: req.body.user,
        body: req.body.user,
        comment: req.body.comment,
        likes: 0
    }

    newReply.save()
        .then(reply => updateBlog(reply.comment, reply._id))
        .catch(err => console.log(`Error ${err}`));

});

module.exports = router;
