const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const reportSchema = new Schema({
    sexual_harassment:{
        type:String,
        trim : true,
        required : true,
    },
    abuse:{
        type:String,
        trim : true
    },
    inappropriate_pictures:{
        type:String,
        required : true,
        trim : true,
    },
    other:{
        type:String,
        required : true,
        trim : true,
    },
    reported_by:{
        type : ObjectId,
        ref: "User",
        required : true
    },  
    reported_person:{
        type : ObjectId,
        ref: "User",
        required : true
    }


},{timestamps: true});

module.exports = mongoose.model("Report",reportSchema);
