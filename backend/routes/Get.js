const router = require("express").Router();
let Blog = require("../models/blog");
let User= require('../models/User');
const Grid = require('gridfs-stream');

const mongoUtil = require("../mongoUtil");
const { ObjectID } = require("bson");
const connection = mongoUtil.getConnection();


router.route("/blog").get((req, res) => {
    console.log(req.query);
    Blog.findById(req.query.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json(err));
});


router.route("/blogs").get((req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs);
        })
})


router.route('/user').get((req, res) => {
    User.findById(req.body.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error ' + err));
})



router.route('/profile').get((req, res) => {

    let send = 0
    let response = {}

    console.log('*****************************************************');

    const respond = (err, result, type) => {
        if (err){
            res.status(400).json(`Error: ${err}`)
        }
        response[type] = result;
        send++;
        console.log(response);
        if (send == 2){
            res.json(response);
        }
    }

    connection.db.collection('fs.files', (err, collection) => {
        if (err){
            res.status(400).json(`Error ${err}`);
        } else {
            collection.findOne({_id: ObjectID(req.query._id)}, (err, result) => {
                respond(err, result, 'file');
            })
        }
    });

    connection.db.collection('fs.chunks', (err, collection) => {
        if (err){
            res.status(400).json(`Error ${err}`);
        }
        collection.find({files_id: ObjectID(req.query._id)}).toArray( (err, result) => {
            respond(err, result, 'chunks');
        })
    });

})

module.exports = router;

router.route


