const { AppError } = require("../helpers/error");
const { respone } = require("../helpers/respones");

const upload=()=>{
     return (req,res,next)=>{
        const file=req.file;
        if(!file){
            next( new AppError(200,"please upload a file"));
        }
        file.path=file.path.replace("/\\/g","/");
        const url= `http://localhost:4000/${file.path}`
        res.status(200).json(respone(url));
     }
}
module.exports={
    upload,
}