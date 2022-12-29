const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const lightSchema = new Schema({
    user1:{
        type : ObjectId,
        ref: "User",
        required : true,
      },
      sent_to1:{
        type : ObjectId,
        ref: "User",
        required : true,
      },  
      sent_light1:{
        type:String,
        enum : ['Green','Yellow','Red'],
        required : true,
      },
      user2:{
        type : ObjectId,
        ref: "User"
      },
      sent_to2:{
        type : ObjectId,
        ref: "User"
      },  
      sent_light2:{
        type:String,
        enum : ['Green','Yellow','Red']
      }
    
},{timestamps: true});

module.exports = mongoose.model("Light",lightSchema);
