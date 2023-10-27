const { AppError } = require('../helpers/error');
const { BienDong, Bill, TaiKhoan,  } = require('../models'); // Import model Card

class BienDongSerVice {
  async getAllBienDongs() {
    try {
      const BienDongs = await BienDong.findAll();
      return BienDongs;
    } catch (error) {
      throw error;
    }
  }
  async getBienDongsByIdTk(idTk,idUser) {
    try {
      const TaiKhoans = await TaiKhoan.findAll({
        where: { idUser }, // Lọc tài khoản của người dùng dựa trên idUser
      });
      let checkIndex=TaiKhoans.findIndex((tk)=>{return tk.idTk.toString()===idTk.toString()})
      if(checkIndex<0){throw new AppError(201, "bạn không có quyền"  )}
      // Sử dụng Sequelize để truy vấn dữ liệu
      const BienDongs = await BienDong.findAll({
        where: { idTk }, // Lọc tài khoản của người dùng dựa trên idUser
        include: [
          {
            model: Bill, // Kết nối với bảng Card
            as: 'Bill', // Bí danh cho mối quan hệ
          },
        ],
      });
  
  
      return BienDongs;
    } catch (error) {
      throw error;
    }
  }
  async getBienDongsByIdUser(idUser){
    const TaiKhoans = await TaiKhoan.findAll({
      where: { IDUSER: idUser }, // Lọc tài khoản của người dùng dựa trên idUser
      include: [
        {
          model: BienDong, // Kết nối với bảng Card
          as: 'BienDongs', // Bí danh cho mối quan hệ
          include:[{
            model:Bill,
            as:"Bill"
          }]
        },
      ],
    });
    const allBds = [];
    TaiKhoans.forEach((taiKhoan) => {
      taiKhoan.BienDongs.forEach((bd) => {
        allBds.push(bd);
      });
    });
    return allBds;
  }
  
  async createBienDong(dataBienDong) {
    try {
      const bd = await BienDong.create(dataBienDong);
      return bd;
    } catch (error) {
      throw error;
    }
  }

}




const bienDongSerVice = new BienDongSerVice();

module.exports = bienDongSerVice;
