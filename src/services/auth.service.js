const { User, InfoUser, Card } = require('../models'); // Import model User
const { AppError } = require('../helpers/error');
const bcrypt=require("bcrypt");
const { generateToken } = require('../helpers/jwt');
const usersService = require('./users.service');
const infoUserService = require('./InfoUser.service');
const taiKhoanService = require('./TaiKhoans.service');
const cardService = require('./cards.service');
const moment= require('moment');
const { Op } = require('sequelize');
class AuthService {
  async login(idUser, password) {
    try {
      // Tìm người dùng bằng idUser
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { idUser },
            { phone: idUser },
          ],
        },
        include: [
          {
            model: InfoUser,
            as: 'InfoUser',
          },
        ],
      });
      if (!user) {
        throw new AppError(404, 'Người dùng không tồn tại');
      }
       // So sánh mật khẩu đã mã hóa từ cơ sở dữ liệu với mật khẩu người dùng
       const isPasswordValid =  bcrypt.compareSync(password, user.password);

       if (!isPasswordValid) {
         throw new AppError(401, 'Mật khẩu không đúng');
       }
       
       let cloneUser={token:generateToken(user).token,user:user}
     return cloneUser
      
    } catch (error) {
      throw error;
    }
  }
  async signIn({ name,address,gioitinh,phone,sex,CCCD,email,birthday}){
      try {
       
        // //tao user
        const dataUser={
          password:this.generatePasswordFromDOB(this.formatDate(birthday)),
          phone:phone,
          role:"user",
          email:email,
        }
        const user=await usersService.createUser(dataUser);
        if(user){
          //tao info
          const dataInfo={ idUser:user.idUser,name,address,gioitinh,phone,sex,CCCD,email,birthday:this.formatDate(birthday)};
          const Info=await infoUserService.createInfoUser(dataInfo);
          if(Info){
             //tao tk 
             const dataTk={
              idUser:user.idUser,
              dateCreate:new Date(),
              maPin:this.generatePasswordFromDOB(birthday),
              tinhTrang:false,
              soDu:100000,
              loaiTK:"tiêu dùng",
             }
             const taiKhoan=await taiKhoanService.createTaiKhoan(dataTk);
             if(taiKhoan){
              //tao card
              const idCard=this.generateRandomID(16)
              while(!this.isIDCardUnique(idCard)){
                 idCard=this.generateRandomID(16)
              }
              const dataCard={
                idCard,
                idTk:taiKhoan.idTk,
                ngayHetHan:new Date().setFullYear(new Date().getFullYear()+3),
                loaiCard:"debit",
              };
              const card=await cardService.createCard(dataCard);
              if(card){
                return {...user.dataValues,password:dataUser.password};
              }
             }else{
              usersService.deleteUser(user.idUser);
              infoUserService.deleteInfoUser(Info.idInfo);
              throw new AppError(401,"ko tao dc user!");
             }
          }else{
            usersService.deleteUser(user.idUser);
            throw new AppError(401,"ko tao dc user!");
          }
        }else{
          throw new AppError(401,"ko tao dc user!");
        }
    
      } catch (error) {
        
       throw error; 
      }
      
  }
  async isIDCardUnique(idCard) {
    try {
      const existingCard = await Card.findOne({
        where: { IDCARD: idCard },
      });
      return !existingCard; // Trả về true nếu ID Card là duy nhất, ngược lại trả về false.
    } catch (error) {
      throw error;
    }
  }
   
   generateRandomID(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
   formatDate(inputDate) {
    // Chuyển định dạng ngày tháng từ "dd/mm/yyyy" sang "YYYY-MM-DD"
    const parsedDate = moment(inputDate, "DD-MM-YYYY");
    
    if (parsedDate.isValid()) {
      return parsedDate.format("YYYY-MM-DD");
    }
    return new Date();
  }
  
  
   generatePasswordFromDOB(dob) {
    // Chuyển đổi ngày tháng năm sinh thành đối tượng Date
    const dateOfBirth = new Date(dob);
  
    // Lấy thông tin ngày, tháng và năm
    const day = dateOfBirth.getDate(); // Lấy ngày
    const month = dateOfBirth.getMonth() + 1; // Lấy tháng (lưu ý rằng tháng bắt đầu từ 0)
    const year = dateOfBirth.getFullYear(); // Lấy năm
  
    // Tạo mật khẩu từ thông tin lấy được
    const password = `${day}${month}${year}`;
    
    return password;
  }
}

const authService = new AuthService();

module.exports = authService;
