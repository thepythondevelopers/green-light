const User = require("../models/user");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator");

exports.userList = async (req,res)=>{
    user = await User.find({role:'User'}).select('-password');
    return res.json(user);
}

exports.userDetails = async (req,res)=>{
    user = await User.find({_id:req.params.id,role:'User'}).select('-password');
    return res.json(user);
}    