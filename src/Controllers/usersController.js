const UsersModel = require("../Models/UsersModel");
const OtpModel = require("../Models/OtpModel");

const jwt = require('jsonwebtoken');
const SendEmailHelper = require("../Helpers/SendEmailHelper");

//create a new User
exports.createUser = async(req,res) =>{
    try {
       let reqBody = req.body;
       let result = await UsersModel.create(reqBody);
       res.status(201).json({"status":"success" , message:result});

    } catch (error) {
        res.status(400).json({"status":"success" , message:error});
    }
};

//User Login

exports.userLogin = async(req,res) =>{
    try {
        let reqBody = req.body;
        let email = reqBody.email;
        let result = await UsersModel.find({email:email}).count()
       
        if(result === 1){
            let payLoad = { exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), email : reqBody.email};
            console.log(payLoad.exp)
            let token = jwt.sign(payLoad,"secret123") ;
            res.status(200).json({"status":"Success" , "messgae":token})
        }
    } catch (error) {
        res.status(400).json({"status":"Failed", data:error})
    }
};


exports.updateUserProfile = async(req,res) =>{
    try {
       let email = req.headers.email ;
       let reqBody = req.body ;
       let result = await UsersModel.updateOne({email:email},reqBody) ;
       res.status(200).json({"status":"Success" , "messgae":result})
    } catch (error) {
        res.status(403).json({"status":"Failed", data:error}) ;
    }
};


exports.profileDetails = async(req,res) =>{
  try {
    let email = req.headers.email ;
    let result = await UsersModel.findOne({email: email});
    res.status(200).json({"status":"Success" , "messgae":result})
  } catch (error) {
    res.status(403).json({"status":"Failed", data:error}) ;
  }
};

exports.RecoverVerifyEmail= async(req,res) =>{
    try {
        let email = req.params.email ;
        let otp = Math.floor(Math.random() * 899999 + 100000) ;
        let EmailText = "Your OTP code for verification is" + " " +otp ;
        let EmailSub = "Email verification Otp Code" ;
        let result = await UsersModel.find({email:email}).count() ;
        if(result  === 1){
            let createOTP = await OtpModel.create({email:email,otp:otp}) ;
            await SendEmailHelper(email,EmailSub,EmailText)
            res.status(200).json({"status":"Success" , "messgae":"Your OTP is send Successfully."})
        }else{
            res.status(400).json({"status":"Failed", data:"Unsuccessfull"}) ; 
        }
        
    } catch (error) {
        res.status(400).json({"status":"Failed", data:error}) ; 
    }
};

exports.resetUserPassword = async(req,res) =>{
    try {
        let email = req.params.email;
        let otp = req.params.otp ;
        let status = 0 ;
        let updatedStatus = 1 ;
        let result = await OtpModel.find({ email: email, otp: otp, status: status}).count();
        if(result === 1){
            await OtpModel.updateOne({status:updatedStatus});
            res.status(200).json({"status":"Success" , "messgae":"Successfully Verified."})
        }else{
            res.status(400).json({"status":"Failed", data:"Unsuccessfull"}) ;   
        }
    } catch (error) {
        res.status(400).json({"status":"Failed", data:error}) ; 
    }
}