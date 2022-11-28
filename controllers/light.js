const User = require("../models/user");
const Light = require("../models/light");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator");

exports.saveLight = async (req,res)=>{
  
  data = {
    sent_to : req.body.sent_to,
    initiated_id : req.user._id,
    sent_light : req.body.sent_light
  }
  light = await Light.findOne({sent_to1 : req.user._id,user1: ObjectId(req.body.sent_to)});
  
  if(light!=null){
    data = {
      user2 : req.user._id,
      sent_to2 : req.body.sent_to,
      sent_light2 : req.body.sent_light
    }
    await Light.findOneAndUpdate(
      {sent_to1 : req.user._id,user1: ObjectId(req.body.sent_to)},
      {$set : data},
      {new: true},
      (err,u) => {
          if(err){
              return res.status(404).json({
                  error : err
              })
          
          }
  
          if(u===null){
              return res.status(404).json({
                  message : "No Data Found"
              })
          }
  
          return res.json({'message' : 'Light Send Successfully.'})
      })
  }else{
    light_check = await Light.findOne({user1 : req.user._id,sent_to1: ObjectId(req.body.sent_to)});
    if(light_check!=null){
      return res.status(400).json({'message' : 'Already Light Send.'})
    }
    data = {
      user1 : req.user._id,
      sent_to1 : req.body.sent_to,
      sent_light1 : req.body.sent_light
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
  user = await Light.find({user1: req.user._id,sent_light1 : 'Green'}).populate('user1','-password').populate('sent_to1','-password');
  return res.send(user);
}

exports.yellowLight = async (req,res)=>{
  user = await Light.find({user1: req.user._id,sent_light1 : 'Yellow'}).populate('user1','-password').populate('sent_to1','-password');
  return res.send(user);
}

exports.mutualGreenLight = async (req,res)=>{
  user = await Light.find({$or: [ { user1:  ObjectId(req.user._id)  }, { sent_to1: ObjectId(req.user._id) } ],sent_light1:"Green",sent_light2: "Green"}).populate('initiated_id','-password').populate('sent_to','-password');
  return res.send(user);
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