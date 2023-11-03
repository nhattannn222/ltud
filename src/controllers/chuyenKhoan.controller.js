const { AppError } = require("../helpers/error");
const { respone } = require("../helpers/respones");
const { TaiKhoan, BienDong, Bill } = require("../models");
const bienDongSerVice = require("../services/BienDongs.service");
const billService = require("../services/Bill.service");
const taiKhoanService = require("../services/TaiKhoans.service");


const chuyenKhoan=async(req,res,next)=>{
    try {
        let {idTkC,tienGD,idTkN,noiDung}=req.body;
        let tkChuyen=await TaiKhoan.findOne({where:{idTk:idTkC}});
        if(!tkChuyen ){throw new AppError(201,"khong co tk chuyen")}
        let tkNhan=await TaiKhoan.findOne({where:{idTk:idTkN}});
        if(!tkNhan ){throw new AppError(201,"khong co tk nhan")}
        if( tkChuyen.soDu*1<tienGD*1){throw new AppError(201,"tk ko du tien de thuc hien giao dich")}
           
        const tkChuyenAfter= await taiKhoanService.updateTaiKhoan(tkChuyen.idTk,{...tkChuyen,soDu:tkChuyen.soDu*1-tienGD*1});
       
        const tkNhanAfter=await taiKhoanService.updateTaiKhoan(tkNhan.idTk,{...tkNhan,soDu:tkNhan.soDu*1+tienGD*1});
        if(!tkNhanAfter){
            //ck that bai tra lai tien cho tk chuyen
            await taiKhoanService.updateTaiKhoan(tkNhan.idTk,tkNhan);
        }
        const bill=await billService.CreateBill({noiDung,tienGD,ngayTaoBill:new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }),trangThai:true});
        
         const bienDongChuyen= await bienDongSerVice.createBienDong({idTk:tkChuyen.idTk,idBill:bill.idBill,soDu:tkChuyenAfter.soDu,loaiBD:0})
         const bienDongNhan= await bienDongSerVice.createBienDong({idTk:tkNhan.idTk,idBill:bill.idBill,soDu:tkNhanAfter.soDu,loaiBD:1})

          
          const ck= await BienDong.findOne({where:{idBD:bienDongChuyen.idBD},include:[{model:Bill,as:"Bill"}]})
         res.status(200).json(respone(ck));
    } catch (error) {
        next(error);
    }
}
module.exports={
    chuyenKhoan,
}