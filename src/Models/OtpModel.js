const mongoose = require('mongoose');

const OtpSchema = mongoose.Schema({
    email:{type: String},
    otp:{type: String , unique:true},   
    status:{type: String, default:0}  
},
{versionKey:false , timestamps:true});

const OtpsModel =mongoose.model("OTPs" , OtpSchema);
module.exports = OtpsModel;