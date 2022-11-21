const User = require("../models/user");
const {validationResult} = require("express-validator");
const AWS = require('aws-sdk');



 


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

function random_code(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.profileImage = async (req,res)=>{
    random = await random_code(8);
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });
    
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: random + req.files.image[0].originalname, // File name you want to save as in S3
        Body: req.files.image[0].buffer,
        ContentType: req.files.image[0].mimetype
    }

    //Uploading files to the bucket
    try {
        const stored = await s3.upload(params).promise()
        await User.updateOne(
            { _id: req.user._id },
            { $push: { images: stored.key } }
         )
       return res.json({message: 'File uploaded successfully.' });
      } catch (err) {
        return res.status(400).json({message: 'Error Occur While uploading.',error:err });
      }
    

}

exports.profileImageDelete = async (req,res)=>{
    key = req.params.key;
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });
    
    
    var params = {  Bucket: process.env.AWS_BUCKET_NAME, Key: key };


try {
    const stored = await s3.deleteObject(params).promise()
    user = await User.findOne({ _id: req.user._id });
    image = user.images;
    image = image.filter(item => item !== key);
    data = {
        images : image
    }
    await User.findOneAndUpdate(
        {_id : req.user._id},
        {$set : data},
        {new: true},
        (err,location) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
    
            if(location===null){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
    
            return res.json({message: 'File deleted successfully.' });
        }
        )
   
  } catch (err) {
    return res.status(400).json({message: 'Error Occur While uploading.',error:err });
  }

}


exports.getProfile = async (req,res)=>{   
    user = await User.findOne({_id:req.user._id});
    return res.json(user);
}