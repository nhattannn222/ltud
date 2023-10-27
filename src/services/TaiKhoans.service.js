const { AppError } = require("../helpers/error");
const { TaiKhoan, Card, BienDong, Bill } = require("../models");

class TaiKhoanService {
  async getTaiKhoans() {
    try {
      const taiKhoans = await TaiKhoan.findAll();
      return taiKhoans;
    } catch (error) {
      throw error;
    }
  }

async getTaiKhoansByUserId(idUser) {
  try {
    // Tìm tài khoản và các bảng liên kết với nó
    const taiKhoan = await TaiKhoan.findAll({
      where: { IDUSER: idUser },
      include: [
        {
          model: Card, // Thay Card bằng tên của bảng Card của bạn
          as: 'Cards', // Thay 'Cards' bằng alias của mô hình Card của bạn (nếu có)
        },
        {
          model: BienDong, // Thay BienDong bằng tên của bảng BienDong của bạn
          as: 'BienDongs', // Thay 'BienDongs' bằng alias của mô hình BienDong của bạn (nếu có)
          include: [
            {
              model: Bill, // Thay Bill bằng tên của bảng Bill của bạn
              as: 'Bill', // Thay 'Bill' bằng alias của mô hình Bill của bạn (nếu có)
            },
          ],
        },
      ],
    });

    return taiKhoan;
  } catch (error) {
    throw error;
  }
}


  async createTaiKhoan(taiKhoanData) {
    try {
      const taiKhoan = await TaiKhoan.create(taiKhoanData);
      return taiKhoan;
    } catch (error) {
      throw error;
    }
  }

  async updateTaiKhoan(idTaiKhoan, newData) {
    try {
      const taiKhoan = await TaiKhoan.findByPk(idTaiKhoan);
      if (!taiKhoan) {
        throw new AppError(404, idTaiKhoan+" :"+"Tài khoản không tồn tại");
      }
      await taiKhoan.update(newData);
      return taiKhoan;
    } catch (error) {
      throw error;
    }
  }

  async deleteTaiKhoan(idTaiKhoan) {
    try {
      const taiKhoan = await TaiKhoan.findByPk(idTaiKhoan);
      if (!taiKhoan) {
        throw new AppError(404, "Tài khoản không tồn tại");
      }
      await taiKhoan.destroy();
    } catch (error) {
      throw error;
    }
  }
}

const taiKhoanService = new TaiKhoanService();

module.exports = taiKhoanService;
