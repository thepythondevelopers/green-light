const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:{
        type:String,
        trim : true
    },
    last_name:{
        type:String,
        trim : true
    },
    dob:{
        type:String,
        required : true,
        trim : true,
    },
    display_name:{
        type:String,
        required : true,
        trim : true,
        unique : true
    },
    email:{
        type:String,
        required : true,
        trim : true,
        unique: true
    },
    password:{
        type:String,
        required : true,
        trim : true
    },
    gender:{
        type:String,
        required : true,
        trim : true
    },
    height:{
        type:String,
        trim : true
    },
    eyes:{
        type:String,
        trim : true
    },
    hair_color:{
        type:String,
        trim : true
    },
    smoking:{
        type:String,
        trim : true
    },
    marijuana:{
            type:String,
            trim : true
    },
    drugs:{
            type:String,
            trim : true
    },
    have_kids:{
            type:String,
            trim : true
    },
    want_kids:{
            type:String,
            trim : true
    },
    astrology_sign:{
            type:String,
            trim : true
    },
    ethinicity:{
            type:String,
            trim : true
    },
    looking_for:{
            type:String,
            trim : true
    },
    interests:{
        type:Array
    },
    alcohol:{
        type:String,
        trim : true
    },
    interested_in:{
        type:Array,
        required : true,
        trim : true
    },
    religion:{
        type:String,
        trim : true
    },
    politics:{
        type:String,
        trim : true
    },  
    have_car:{
        type:String,
        trim : true
    },
    work:[
            {
                position:String,
                employer:String
            }
    ],
    education_school:{
            type:String,
            trim : true
    },
    about_me:{
            type:String,
            trim : true
    },
    location:{
        type:String,
        trim : true
    },
    mobile:{
        type:Number,
        trim : true
    },
    country:{
        type:String,
        required : true,
        trim : true
    },
    state:{
        type:String,
        required : true,
        trim : true
    },
    city:{
        type:String,
        required : true,
        trim : true
    },
    zipcode:{
        type:String,
        required : true,
        trim : true
    },    
    images:{
        type :Array
    },
    role:{
        type:String,
        required : true,
        default : 'User'
    }, 
    password_reset_token:{
        type:String,
        trim : true
    },
    password_reset_time:{
        type:Date,
        trim : true
    },
    status:{
        type:Number,
        enum : [0,1,2],
        default:1 //0=>False/Delete 1=>True/Active 2=>Deactive
    },
    plan:{
        type:String,
        default:'Basic'
    },
    singup_type:{
        type:String,
        default:'web'
    }
},{timestamps: true});

module.exports = mongoose.model("User",userSchema);
