const User = require("../models/user");
const Light = require("../models/light");
const Chat = require("../models/chat");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator");

exports.saveChat = async (req,res)=>{
  
  data = {
    to : req.body.to,
    by : req.user._id,
    message : req.body.message
  }
  chat =new Chat(data);
  chat.save((err,chat)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json(chat);
  })
}

exports.getChat = async (req,res) =>{
  
         
  user_id = req.params.user_id;
  
  result = await Chat.aggregate([
    { $match: {
      $or : [
        { $and : [{ by: ObjectId(req.user._id) }, { to: ObjectId(user_id) }] },
        { $and : [ { by: ObjectId(user_id) },{ to: ObjectId(req.user._id) } ] }
    ]
     } },
    {$sort: {_id: 1}},
    { $group: { _id :{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt"} },doc: { $push : "$$ROOT" } } },
    {$sort: {_id: 1}},
    
    
  ])     
 return res.json(result);    
    
}