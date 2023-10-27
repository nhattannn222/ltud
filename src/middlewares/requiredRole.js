const { AppError } = require("../helpers/error");


const requiredRole=(...roles)=>{
    return (req,res,next)=>{
        const {user}= res.locals;
        const isMatch= roles.includes(user.role);
        if(!isMatch){
            next(new AppError(403,"have no permission"));
            return;
        }
        next();
    }
}
module.exports= requiredRole;