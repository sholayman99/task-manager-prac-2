const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{type: String},
    email:{type: String , unique:true},   
    password:{type: String},
    mobile:{type: String}
},
{versionKey:false , timestamps:true});

const UsersModel =mongoose.model("users" , UserSchema);
module.exports = UsersModel;