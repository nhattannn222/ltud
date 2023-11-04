const { AppError } = require("../helpers/error");
const { respone } = require("../helpers/respones");
const { TaiKhoan, BienDong, Bill } = require("../models");
const bienDongSerVice = require("../services/BienDongs.service");
const billService = require("../services/Bill.service");
const firebaseService = require("../services/firebase.service");
const taiKhoanService = require("../services/TaiKhoans.service");
const usersService = require("../services/users.service");


const chuyenKhoan=async(req,res,next)=>{
    try {
        let {idTkC,tienGD,idTkN,noiDung}=req.body;
        let tkChuyen=await TaiKhoan.findOne({where:{idTk:idTkC}});
        if(!tkChuyen ){throw new AppError(201,"chọn tài khoản chuyển")}
        let tkNhan=await TaiKhoan.findOne({where:{idTk:idTkN}});
        if(!tkNhan ){throw new AppError(201,"nhập stk người nhận")}
        if( tkChuyen.soDu*1<tienGD*1){throw new AppError(201,"số dư không đủ")}
           if (tienGD*1<0){ throw new AppError(201,"tiền giao dịch không hợp lệ")}
        const tkChuyenAfter= await taiKhoanService.updateTaiKhoan(tkChuyen.idTk,{...tkChuyen,soDu:tkChuyen.soDu*1-tienGD*1});
       
        const tkNhanAfter=await taiKhoanService.updateTaiKhoan(tkNhan.idTk,{...tkNhan,soDu:tkNhan.soDu*1+tienGD*1});
        if(!tkNhanAfter){
            //ck that bai tra lai tien cho tk chuyen
            await taiKhoanService.updateTaiKhoan(tkNhan.idTk,tkNhan);
        }
        const bill=await billService.CreateBill({noiDung,tienGD,ngayTaoBill:new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }),trangThai:true});
        
         const bienDongChuyen= await bienDongSerVice.createBienDong({idTk:tkChuyen.idTk,idBill:bill.idBill,soDu:tkChuyenAfter.soDu,loaiBD:0})
         const bienDongNhan= await bienDongSerVice.createBienDong({idTk:tkNhan.idTk,idBill:bill.idBill,soDu:tkNhanAfter.soDu,loaiBD:1})
         
         //thong bao toi thiet bi
         let user=await usersService.getUserByIdTk(idTkN);
         if(user && user.fcmToken!=null){
             const tb= await firebaseService.fcmBienDong("chuyen khoan",`biến động:+${bill.tienGD},số dư:${bienDongNhan.soDu},nội dung:${bill.noiDung}`,user.fcmToken);
             res.status(200).json(respone(tb));
         }else{
            new AppError(201,"test thong bao loi ")
         }
          
          const ck= await BienDong.findOne({where:{idBD:bienDongChuyen.idBD},include:[{model:Bill,as:"Bill"}]})
         res.status(200).json(respone(ck));
    } catch (error) {
        next(new AppError(201,"chuyển khoản thất bại"));
    }
}
module.exports={
    chuyenKhoan,
}