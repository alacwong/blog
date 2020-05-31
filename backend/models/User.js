/**
 * Schema for user type
 */
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  password: {
      type: String, 
      required: true,
      trim: true,
      minlength: 6
  },

  firstname: {
      type:String,
      required: true,
      minlength: 3,
      trim: true
  },

  lastname: {
    type:String,
    required: true,
    minlength: 3,
    trim: true
}, 

profile: String,
blogs: [String]

}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;