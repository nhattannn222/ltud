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
  
  
  async createUser(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, newData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }

      await user.update(newData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }

      await user.destroy();
    } catch (error) {
      throw error;
    }
  }
}

const usersService = new UsersService();

module.exports = usersService;
