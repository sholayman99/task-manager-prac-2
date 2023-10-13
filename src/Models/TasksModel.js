const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
   title:{type:String} ,
   description:{type:String},
   status:{type:String},
   email:{type:String }
},
{versionKey:false , timestamps:true});

const TasksModel =mongoose.model("tasks" ,TaskSchema);
module.exports =TasksModel;