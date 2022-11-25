const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const chatSchema = new Schema({
    to:{
        type : ObjectId,
        ref: "User",
        required : true,
      },
    by:{
        type : ObjectId,
        ref: "User",
        required : true,
      },  
    message:{
        type:String,
        required : true,
      },
    read_status:{
        type:Boolean,
        default : 0
      },  
    
},{timestamps: true});

module.exports = mongoose.model("Chat",chatSchema);
