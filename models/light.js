const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const lightSchema = new Schema({
    initiated_id:{
        type : ObjectId,
        ref: "User",
        required : true,
      },
      sent_to:{
        type : ObjectId,
        ref: "User",
        required : true,
      },  
      sent_light:{
        type:String,
        enum : ['Green','Yellow','Red'],
        required : true,
      },
      response_light:{
        type:String,
        enum : ['Green','Yellow','Red']
      },
    
},{timestamps: true});

module.exports = mongoose.model("Light",lightSchema);
