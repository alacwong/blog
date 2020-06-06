const router = require("express").Router();
let Blog = require("../models/blog");

router.route("/blog").get((req, res) => {
    console.log(req.query);
    Blog.findById(req.query.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json(err));
});

module.exports = router;

router.route


