const router = require("express").Router();
let User  = require("../models/User");
/**
 * Add user to datavase
 */
router.route("/add").post((req, res) =>{
    const newUser = new User({
        username: req.body.username,
        password: req.body.password, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profile: "DEFAULT STRING",
        blogs: []
    })   
   
    newUser.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json(`Error ${err}`));
});

/**
 * Authenticate user
 */
router.route("/auth").get((req, res) =>{

    //INSOMNIA TEST
    // User.findOne({
    //     username: req.body.username,
    //     password: req.body.password
    // }).then(user => res.json(user))
    //   .catch(err => res.status(400).json(`Error: ${err}`));

    console.log(req.query);
    User.findOne(req.query)
        .then(user => res.json(user))
        .catch(err => console.log(err));

    // console.log(res);
})

module.exports = router;