const router = require("express").Router();

router.route("/add").post((req, res) =>{
    const newBlog = {
        user: req.body.user,
        body: req.body.user,
        title: req.body.user,
        replies: []
    }
});

