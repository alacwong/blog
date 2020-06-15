const router = require("express").Router();
let User  = require("../models/User");

/**
 * Add user to datavase
 */
router.route("/add").post((req, res) =>{
    const defaultProfileID = '5ee69b33ad66c928bcdf38f3'
    const newUser = new User({
        username: req.body.username,
        password: req.body.password, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profile: defaultProfileID,
        blogs: []
    })   
   
    newUser.save()
        .then((user) => res.json(user))
        .catch(err => res.status(400).json(`Error ${err}`));
});

/**
 * Authenticate user
 */
router.route("/auth").get((req, res) =>{

    console.log(req.query);
    User.findOne(req.query)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`));

})




router.route("/get").get((req, res) =>{
    const users = []
    User.find({})
        .then( users => {
            res.json(users);
            for (const user of users){
                console.log(user.username)
                for (const blog of user.blogs){
                    console.log(blog)
                }
            }
        })
    

});





module.exports = router;
router.route