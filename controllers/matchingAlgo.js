const User = require("../models/user");
const {validationResult} = require("express-validator");

exports.matchingAlgo = async (req,res)=>{
  
  user = await User.find({ _id: { $ne: req.user._id } }).select('-password');
  return res.json(user); 
  
}
