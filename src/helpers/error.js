class AppError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
    }
}
const handelErrors=(err,req,res,next)=>{
   if(!(err instanceof AppError)){
     err= new AppError(500,"hệ thống đang bảo trì");
   }
   const {message,statusCode}=err;
   res.status(statusCode).json({
       status:"error",
       message:message,
   });
   next();
};
module.exports={
    AppError,
    handelErrors,
}