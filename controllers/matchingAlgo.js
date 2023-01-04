const User = require("../models/user");
const Light = require("../models/light");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator");
const moment= require('moment')
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
var pluck = require('arr-pluck');
exports.matchingAlgo = async (req,res)=>{
 notincluded =[];
  yellow_light = await Light.find({ user:  ObjectId(req.user._id)  ,light:"Yellow"}).select('sent');
  yellow_light_id = pluck(yellow_light, 'sent');

  notincluded = notincluded.concat(yellow_light_id);
  
  red_light = await Light.find({ user:  ObjectId(req.user._id)  ,light:"Red"}).select('sent');
  red_light_id = pluck(red_light, 'sent');
  notincluded = notincluded.concat(red_light_id);

  
  const eyes = req.body.eyes!=null ? req.body.eyes : "";
  const hair_color = req.body.hair_color!=null ? req.body.hair_color : "";
  const religion = req.body.religion!=null ? req.body.religion : "";

  if(req.body.search==1){
    distance =25;
  }else{
    distance =50;
  } 
    
  current_user = await User.findOne({'_id': req.user._id});
  
  if(req.body.search==1){
    
  }else{
    not_include = req.body.not_include;
    notincluded = notincluded.concat(not_include);
  }


  if(req.body.age_from!=null && req.body.age_to!=null){
    gte_value = req.body.age_to;
      lte_value = req.body.age_from;
  }else{
    let userage = new AgeFromDateString(current_user.dob).age;
    if(req.body.search==1){
      gte_value = userage+5;
      lte_value = userage-5;
    }else{
      gte_value = userage+10;
      lte_value = userage-10;
    }
  }

  if(req.body.height_from!=null && req.body.height_to!=null){
    gte_height = req.body.height_from;
      lte_height = req.body.height_to;
  }else{
    let userheight = current_user.height.age;
    if(req.body.search==1){
      gte_height = userheight-15;
      lte_height = userheight+15;
    }else{
      gte_height = userheight-30;
      lte_height = userheight+30;
    }
  }

  
  gte = moment().subtract(gte_value, 'years').toISOString();
  lte = moment().subtract(lte_value, 'years').toISOString();
  
  const interested_in = req.body.interested_in!=null ? req.body.interested_in : current_user.interested_in;

  user = await User.find(
    {
       _id: { $ne: req.user._id },
       _id: {$nin: notincluded},
      gender:  { $in: interested_in },
      'dob': {
        $gte: gte,
        $lte: lte
      },
    latLng :
      { $near :
         {
           $geometry : {
              type : "Point" ,
              coordinates : current_user.latLng.coordinates },
           $maxDistance : distance*1000
         }
      },
   
       
     'height': {
       $gte: gte_height,
       $lte: lte_height
     },
     $or:[
       {'eyes': eyes},
      {'hair_color': hair_color},
      {'religion': religion},
     ]
  }
    ).select('-password');
  return res.json({data:user,red_light :red_light_id,yellow_light:yellow_light_id}); 
  
}

exports.matchingAlgoDisplayName = async (req,res)=>{
  const search_string = req.body.search_string!=null ? req.body.search_string : "";
  user = await User.find({ _id: { $ne: req.user._id },  role: { $ne: 'admin' } ,   $or:[
    {'display_name': { $regex: '.*' + `${search_string}` + '.*' }}
  ] }).select('-password');
  return res.json(user); 
  
}
