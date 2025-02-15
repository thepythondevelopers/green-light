const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const lightSchema = new Schema({
    user:{
        type : ObjectId,
        ref: "User",
        required : true,
      },
      sent:{
        type : ObjectId,
        ref: "User",
        required : true,
      },  
      light:{
        type:String,
        enum : ['Green','Yellow','Red'],
        required : true,
      }
    
},{timestamps: true});

module.exports = mongoose.model("Light",lightSchema);
