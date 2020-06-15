const router = require("express").Router();
const multer = require('multer');
const path = require('path');

let User  = require("../models/User");
const GridFsStorage = require('multer-gridfs-storage');
const mongoUtil = require('../mongoUtil');

const storage = new GridFsStorage({
   db: mongoUtil.getConnection(),
   file: (req, file) => {
      newFile = 'image' + Date.now() + path.extname(file.originalname)
     return {
       filename: newFile
     };
   }
  });
 const upload  = multer({ storage: storage }).single('image');


 router.route('/profile').post( (req, res) => {
   upload(req, res ,(err) => {
      if (err){
         res.json(err);
      }

      if (req.file){
         User.findById(req.body.user)
         .then(user => {
            user.profile = req.file.id;
            user.save()
               .then(() => {
                  res.json(`User: ${user.username} profile updated to ${user.profile}`);
               })
               .catch((err) => res.json(`failure ${err}`));
         })
      } else {
         res.status(400).json('no file');
      }     

   })
 });

module.exports = router;

router.route