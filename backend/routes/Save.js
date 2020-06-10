const router = require("express").Router();
const multer = require('multer');
const path = require('path');
let User  = require("../models/User");
let newFile;

const storage = multer.diskStorage({
    destination: "../frontend/src/components/profile/",
    filename: function(req, file, cb){
         newFile = "IMAGE-" + Date.now() + path.extname(file.originalname)
       cb(null,newFile);
    }
 });
 
 const upload  = multer({ storage: storage }).single('image');


 router.route('/profile').post( (req, res) => {
   upload(req, res ,(err) => {
      if (err){
         res.json(err);
      }
      console.log(req.file);
      //upload link to monogdb
      User.findById(req.body.user)
         .then(user => {
            user.profile = './profile/' +  newFile;
            user.save()
               .then(() => res.json("success"))
               .catch((err) => res.json(`failure ${err}`));
         })
   })
 });


module.exports = router;

router.route