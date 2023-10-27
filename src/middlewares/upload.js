const multer= require("multer");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        //setup thu muc file dc luu vao
        cb(null,"./static/")
    },
    filename:(req,file,cb)=>{
        console.log(file)
        const unique=Date.now()+"-"+Math.round(Math.random() *1e9);
        cb(null,`${unique}-${file.originalname}`);
    },
});
const uploadMiddelware=multer({storage});
module.exports=uploadMiddelware;