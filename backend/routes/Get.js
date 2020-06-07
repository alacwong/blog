const router = require("express").Router();
let Blog = require("../models/blog");
let User= require('../models/User');

router.route("/blog").get((req, res) => {
    console.log(req.query);
    Blog.findById(req.query.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json(err));
});

router.route("/blogs").get((req, res) => {
    Blog.find({})
        .then(blogs => {
            users = blogs.map(blog => User.findById(blog.user))
            Promise.all(users)
                .then(resolved => {
                    const result = []
                    for (let i =0; i < resolved.length; i++){
                        result.push([blogs[i], resolved[i]]);
                    }
                    res.json(result);
                })
        })
})


module.exports = router;

router.route


