const User = require("../models/user");
const Light = require("../models/light");
const {validationResult} = require("express-validator");

exports.saveLight = async (req,res)=>{
  
  data = {
    to : req.body.to,
    by : req.user._id,
    light : req.body.light
  }
  Light.findOneAndUpdate(
          {to : req.body.to,by : req.user._id},
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
