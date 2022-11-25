const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const lightSchema = new Schema({
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
    light:{
        type:String,
        required : true,
      },
    
},{timestamps: true});

module.exports = mongoose.model("Light",lightSchema);
