const { AppError } = require("../helpers/error");
const jwt=require("jsonwebtoken");
const configs=require("../Config")

const { User } = require("../models");
const extractTokenFromHeaders=(headers)=>{
   try{
    const bearerToken = headers.authorization;
    const parts=bearerToken.split(" ");
    if(parts.length !==2 || parts[0] !=="Bearer" || !parts[1].trim()){
        throw new AppError(401,"invalid token");
    }
    return parts[1];
   }catch(e){
    throw new AppError(401,"unauthorization");
   }
}

const authorization=async (req,res,next)=>{
try{
  const token=extractTokenFromHeaders(req.headers);
  const payload=  jwt.verify(token,configs.SECRET_KEY);
  const user=await User.findByPk(payload.id);
    if(!user){
        throw new AppError(401,"invalid token");
    }
    console.log(user);
    res.locals.user=user;
    console.log(payload);
    next();
}catch(e){
   if(e instanceof jwt.JsonWebTokenError){
    next( new AppError(401,"Invalid token"))
   }
   next(e);
}
}
module.exports= authorization;