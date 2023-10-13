const TasksModel = require("../Models/TasksModel");

exports.createTask = async(req,res) =>{
   
    try {
        let email = req.headers.email ;
        let reqBody = req.body ;
        reqBody.email = email ;
        let result = await TasksModel.create(reqBody) ;
        res.status(201).json({"status":"success" , "message":result});
    } catch (error) {
        res.status(401).json({"status":"Failed" , "message":error});
    }
};

exports.updateTaskStatus = async(req,res) =>{
    try {
       let status = req.params.status ;
       let id = req.params.id ;
       let result = await TasksModel.updateOne({_id:id} , {status:status}) ;
       res.status(201).json({"status":"success" , "message":result});
    } catch (error) {
        res.status(401).json({"status":"Failed" , "message":error});
    }
};

exports.listTaskByStatus = async(req,res) =>{
    try {
      let email = req.headers.email ;
      let status = req.params.status ;
      let result = await TasksModel.find({ email: email, status: status})  ;
      res.status(201).json({"status":"success" , "message":result});
    } catch (error) {
        res.status(401).json({"status":"Failed" , "message":error});  
    }
};

exports.taskStatusCount = async(req,res) =>{
    try {
        let email = req.headers.email ;
        let result = await TasksModel.aggregate([
            {$match: {email:email}},
            {$group:{_id:"$status" , total:{$count:{}}}}
        ]);
        res.status(200).json({"status":"success" , "message":result});
    } catch (error) {
        res.status(401).json({"status":"Failed" , "message":error});  
    }  
 };

 exports.removeTask = async(req,res) =>{
    try {
        let id = req.params.id;
        let result = await TasksModel.deleteOne({_id:id});
        res.status(200).json({"status":"success" , "message":result});
    } catch (error) {
        res.status(401).json({"status":"Failed" , "message":error});  
    }
 }
