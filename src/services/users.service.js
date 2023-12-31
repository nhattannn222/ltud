const { AppError } = require("../helpers/error");
const { User, InfoUser, KhachHang, TaiKhoan, Bill, BienDong, Card, } = require("../models");

class UsersService {
  async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: InfoUser,
            as: 'InfoUser',
          },
          {
            model: TaiKhoan,
            as: 'TaiKhoans',
            include: [
              {
                model: Card,
                as: 'Cards',
              },
              {
                model: BienDong,
                as: 'BienDongs',
                include: [
                  {
                    model: Bill,
                    as: 'Bill',
                  },
                ],
              },
            ],
          },
        ],
      });
  
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  
  async createUser(userData, options = {}) {
    try {
      const user = await User.create(userData, { transaction: options.transaction });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(userId, newData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError("Người dùng không tồn tại");
      }

      await user.update(newData);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async updatePasswordUser(userId, newPassword) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        // Xử lý khi không tìm thấy người dùng
        // Ví dụ: Trả về lỗi 404 - Không tìm thấy
        throw new AppError(404,"Không tìm thấy người dùng");
      }
      // Cập nhật mật khẩu của người dùng
      user.password = newPassword;
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(idUser) {
    try {
      const user = await User.findByPk(idUser);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      await user.destroy();
    } catch (error) {
      throw error;
    }
  }
  async setTokenFcm(idUser,token){
    try {
      //reset token of user before
      const userHaveTheSameToken = await User.findOne({where:{tokenFcm:token}});
      if(userHaveTheSameToken){ userHaveTheSameToken.tokenFcm=""; await userHaveTheSameToken.save(); }
      //
      const user = await User.findByPk(idUser);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      user.tokenFcm=token;
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserByIdTk(idTk) {
    try {
      const user = await User.findOne({
        include: [
          {
            model: TaiKhoan,
            where: { idTk: idTk },
            
          },
          {
            model: InfoUser,
            as: 'InfoUser',
          },
          // Include thêm các liên kết cần thiết nếu có
        ],
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

const usersService = new UsersService();

module.exports = usersService;
