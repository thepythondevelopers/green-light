const User = require("../models/user");
const {validationResult} = require("express-validator");
const moment= require('moment')
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
exports.matchingAlgo = async (req,res)=>{
 

  const eyes = req.body.eyes!=null ? req.body.eyes : "";
  const hair_color = req.body.hair_color!=null ? req.body.hair_color : "";
  const religion = req.body.religion!=null ? req.body.religion : "";

    
  current_user = await User.findOne({'_id': req.user._id});
  
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
  gte = moment().subtract(gte_value, 'years').toISOString();
  lte = moment().subtract(lte_value, 'years').toISOString();
  
  const interested_in = req.body.interested_in!=null ? req.body.interested_in : current_user.interested_in;
  
  user = await User.find(
    {
       _id: { $ne: req.user._id },
    //  gender:  { $in: interested_in },
    //  'dob': {
    //    $gte: gte,
    //    $lte: lte
    //  },
    // latLng:
    //    { $near :
    //       {
    //         $geometry: { type: "Point",  coordinates: [10.1631526,76.6412712] },
    //         $minDistance: 1000,
    //         $maxDistance: 5000
    //       }
    //    },
       
    // 'height': {
    //   $gte: "5'0",
    //   $lte: "6'9"
    // },
    // $or:[
    //   {'eyes': eyes},
    //   {'hair_color': hair_color},
    //   {'religion': religion},
    // ]
  }
    ).near('latLng', { center : [10.1631526, 76.6412712], spherical: true, maxDistance: 5000 } ).select('-password');
  return res.json(user); 
  
}

exports.matchingAlgoDisplayName = async (req,res)=>{
  const search_string = req.body.search_string!=null ? req.body.search_string : "";
  user = await User.find({ _id: { $ne: req.user._id },  role: { $ne: 'admin' } ,   $or:[
    {'display_name': { $regex: '.*' + `${search_string}` + '.*' }}
  ] }).select('-password');
  return res.json(user); 
  
}
