const express = require('express');
const { createUser, userLogin, updateUserProfile, profileDetails, RecoverVerifyEmail, resetUserPassword } = require('../Controllers/usersController');
const AuthVerifyMiddleware = require('../Middlewares/AuthVerifyMiddleware');
const { createTask, updateTaskStatus, listTaskByStatus, taskStatusCount, removeTask,  } = require('../Controllers/tasksController');
const router = express.Router();


//users 
router.post("/createUser" , createUser);
router.post("/login" , userLogin);
router.put("/updateUserProfile" , AuthVerifyMiddleware , updateUserProfile);
router.get("/userDetails" , AuthVerifyMiddleware , profileDetails);
router.post("/recoverEmail/:email" , AuthVerifyMiddleware , RecoverVerifyEmail)
router.put("/verifyOtp/:email/:otp" , AuthVerifyMiddleware , resetUserPassword)

//handle task 
router.post("/createTask" , AuthVerifyMiddleware , createTask);
router.put("/updateTaskStatus/:id/:status", AuthVerifyMiddleware , updateTaskStatus);
router.get("/listByItems/:status", AuthVerifyMiddleware , listTaskByStatus);
router.get("/taskStatusCount" , AuthVerifyMiddleware , taskStatusCount);
router.delete("/removeTask/:id", AuthVerifyMiddleware , removeTask);
module.exports = router