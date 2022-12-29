const User = require("../models/user");
const Light = require("../models/light");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator");
var pluck = require('arr-pluck');
exports.saveLight = async (req,res)=>{
  
  
  light = await Light.findOne({user : req.user._id,sent: ObjectId(req.body.sent_to)});
  
  if(light!=null){
    return res.json({'message' : 'Already Light Send.'})
  }else{

    data = {
      user : req.user._id,
      sent : req.body.sent_to,
      light : req.body.sent_light
    }
  
  l =new Light(data);
  l.save((err,li)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json({'message' : 'Light Send Successfully.'})
  })
}
  
}

exports.sentGreenLight = async (req,res)=>{
  user = await Light.find({ user:  ObjectId(req.user._id)  ,light:"Green"}).select('sent');
  sent_id = pluck(user, 'sent');
  
  other_user = await Light.find({user: { $in: sent_id },light:  "Green" }).select('user');
  other_user_id = pluck(other_user, 'user');
  
  result = await Light.find({ user:  ObjectId(req.user._id)  ,light:"Green",sent: {$nin: other_user_id }});
 return res.json(result);
}

exports.yellowLight = async (req,res)=>{
  user = await Light.find({ user:  ObjectId(req.user._id)  ,light:"Yellow"});
  return res.send(user);
}

exports.mutualGreenLight = async (req,res)=>{
  user = await Light.find({ user:  ObjectId(req.user._id)  ,light:"Green"}).select('sent');
  
  sent_id = pluck(user, 'sent');
  other_user = await Light.find({user: { $in: sent_id },light:"Green"}).populate('user','-password');
  return res.send(other_user);
}

exports.responseLight = async (req,res)=>{
  data = {
    response_light : req.body.response_light
  }
  Light.findOneAndUpdate(
    {_id:req.params.id,sent_to : ObjectId(req.user._id)},
    {$set : data},
    {new: true},
    (err,light) => {
      if(err){
      return res.status(400).json({
          message : "Something Went Wrong"
      })
  }
  if(light===null){
    return res.status(404).json({
        message : "No Data Found"
    })
}

  return res.json(light);
})
}  

exports.test = async (req,res)=>{
  return res.json('Hello');
}  