const router = require("express").Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: "../../frontend/src/components/profile/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now());
    }
 });
 
 const upload  = multer({ storage: storage }).single('image');


 router.route('/profile').post( (req, res) => {
   upload(req, res ,(err) => {
      if (err){
         res.json(err);
      }
      console.log(req.file);
      res.json("success")
   })
 })



module.exports = router;

router.route