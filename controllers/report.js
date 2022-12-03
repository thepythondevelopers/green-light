const User = require("../models/user");
const Report = require("../models/report");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator");

exports.saveReport = async (req,res)=>{
  

  report = await Report.findOne({reported_by : req.user._id,reported_person: ObjectId(req.body.reported_person)});
  
  if(report!=null){
      
      return res.json({'message' : 'You have already reported this person.'})
  
  }else{

    data = {
      reported_by : req.user._id,
      reported_person : req.body.reported_person,
      sexual_harassment : req.body.sexual_harassment,
      abuse : req.body.abuse,
      inappropriate_pictures : req.body.inappropriate_pictures,
      other : req.body.other
    }
  
  r =new Report(data);
  r.save((err,li)=>{
        if(err){
            return res.status(400).json({
                message : err
            })
        }
        return res.json({'message' : 'Report Submitted Successfully.'})
  })
}
  
}
