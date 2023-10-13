const jwt = require('jsonwebtoken');

const AuthVerifyMiddleware = (req,res,next)=>{
try {
    let token = req.headers.token
   let decoded = jwt.verify(token, "secret123");
   let email = decoded.email ;
   req.headers.email = email ;
   next()
} catch (error) {
    res.status(400).json({"status":"UnAuthorized", data:error})
}
}

module.exports = AuthVerifyMiddleware