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
  Light.findOneAndUpdate(
          {sent_to : req.body.sent_to,initiated_id : req.user._id},
          {$set : data},
          {upsert: true,new: true},
          (err,light) => {
            if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(light);
  })
}

exports.sentGreenLight = async (req,res)=>{
  user = await Light.find({initiated_id: req.user._id,sent_light : 'Green'}).populate('initiated_id','display_name').populate('sent_to','display_name');
  return res.send(user);
}

exports.yellowLight = async (req,res)=>{
  user = await Light.find({initiated_id: req.user._id,sent_light : 'Yellow'}).populate('initiated_id','display_name').populate('sent_to','display_name');
  return res.send(user);
}

exports.mutualGreenLight = async (req,res)=>{
  user = await Light.find({$or: [ { initiated_id:  ObjectId(req.user._id)  }, { sent_to: ObjectId(req.user._id) } ],sent_light:"Green",response_light: "Green"}).populate('initiated_id','display_name').populate('sent_to','display_name');
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