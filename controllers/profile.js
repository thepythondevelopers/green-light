const User = require("../models/user");
const UserToken = require("../models/userToken");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');

const moment= require('moment') 


exports.personalInformation =  (req,res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

  
  user_data = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    dob : req.body.dob,
    gender : req.body.gender,
    interested_in : req.body.interested_in,
    height : req.body.height,
    eyes : req.body.eyes,
    hair_color : req.body.hair_color,
    interests : req.body.interests
  }

  User.findOneAndUpdate(
    {_id: req.user._id},
    {$set : user_data},
    {new: true},
    async (err,user) =>  {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }
        if(user===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }
      
    return res.json(user);    
                
    })  
  
  
}

exports.personalPreferences = (req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

  
  user_data = {
    alcohol : req.body.alcohol,
    smoking : req.body.smoking,
    marijuana : req.body.marijuana,
    drugs : req.body.drugs,
    have_kids : req.body.have_kids,
    want_kids : req.body.want_kids,
    astrology_sign : req.body.astrology_sign,
    ethinicity : req.body.ethinicity,
    looking_for : req.body.looking_for
  }

  User.findOneAndUpdate(
    {_id: req.user._id},
    {$set : user_data},
    {new: true},
    async (err,user) =>  {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }
        if(user===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }
      
    return res.json(user);    
                
    })  
}







exports.professionalInformation =  (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

  
  user_data = {
    have_car : req.body.have_car,
    work_position : req.body.work_position,
    work_employer : req.body.work_employer,
    education_degree : req.body.education_degree,
    education_school : req.body.education_school,
    about_me : req.body.aout_me
  }

  User.findOneAndUpdate(
    {_id: req.user._id},
    {$set : user_data},
    {new: true},
    async (err,user) =>  {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }
        if(user===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }
      
    return res.json(user);    
                
    })
} 


exports.locationInformation =  (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

  
  user_data = {
    location : req.body.location,
    mobile : req.body.mobile,
    country : req.body.country,
    state : req.body.state,
    city : req.body.city,
    zipcode : req.body.zipcode
  }

  User.findOneAndUpdate(
    {_id: req.user._id},
    {$set : user_data},
    {new: true},
    async (err,user) =>  {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }
        if(user===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }
      
    return res.json(user);    
                
    })
} 
