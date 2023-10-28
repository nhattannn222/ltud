const authService = require('../services/auth.service');
const { AppError } = require('../helpers/error');
const { respone } = require('../helpers/respones');
const usersService = require('../services/users.service');

async function login(req, res, next) {
  try {
    const { idUser, password } = req.body;

    // Gọi service để kiểm tra đăng nhập
    const user = await authService.login(idUser, password);

    // Nếu đăng nhập thành công, bạn có thể tạo JWT token hoặc thực hiện các tác vụ khác
    // ở đây dựa trên người dùng đã xác thực

    res.status(200).json(respone(user));
  } catch (error) {
    if (error instanceof AppError) {
      // Xử lý các lỗi bạn đã định nghĩa trong AppError
      res.status(error.statusCode).json({ status: 'error', message: error.message });
    } else {
      // Xử lý các lỗi khác
      next(error);
    }
  }
}
async function signIn(req,res,next){
try {
  const { name,address,gioitinh,phone,sex,CCCD,email,birthday}=req.body;
  const user=await  authService.signIn({ name,address,gioitinh,phone,sex,CCCD,email,birthday,});
  res.status(200).json(respone(user));
} catch (error) {
  next(error);
}
}
async function changePassword(req,res,next){
  try{
    let idUser=res.locals.user.idUser;
    const {oldPassword,newPassword}=req.body;
    const isAuth= await authService.login(idUser,oldPassword);
     const userUpdate=  usersService.updatePasswordUser(idUser,newPassword);
     res.status(200).json(respone("thanh cong"));
  }catch(err){
    next(err);
  }
}
function getProFile(){
  return (req,res,next)=>{
    try{
      const {user}=res.locals;
      res.status(200).json(respone(user));
  }catch(e){
      next(e);
  }
  }
}

module.exports = { login,getProFile ,signIn,changePassword};
