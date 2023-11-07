// InfoUserService.js

const { AppError } = require("../helpers/error");
const { InfoUser } = require("../models");
const usersService = require("./users.service");


class InfoUserService {
  async getAllInfoUsers() {
    try {
      // Lấy tất cả các thông tin người dùng
      const infoUsers = await InfoUser.findAll();
      return infoUsers;
    } catch (error) {
      throw error;
    }
  }

  async getInfoUserByIdUser(idUser) {
    try {
      // Lấy thông tin người dùng bằng idInfo
      const infoUser = await InfoUser.findOne({
        idUser
      });

      if (!infoUser) {
        throw new Error('Không tìm thấy thông tin người dùng');
      }

      return infoUser;
    } catch (error) {
      throw error;
    }
  }
  
  async getInfoUserByIdTk(idTk) {
    try {
      // Lấy thông tin người dùng bằng idInfo
      const user = await usersService.getUserByIdTk(idTk);
      
      if (!user) {
        throw new AppError('Không tìm thấy thông tin người dùng');
      }
      const infoUser=user.InfoUser;
      return infoUser.name;
    } catch (error) {
      throw error;
    }
  }
  async createInfoUser(infoUserData, options = {}) {
    try {
      // Tạo một bản ghi thông tin người dùng mới
      const newInfoUser = await InfoUser.create(infoUserData, { transaction: options.transaction });
  
      return newInfoUser;
    } catch (error) {
      throw error;
    }
  }

  async updateInfoUser(idUser, updatedInfoUserData) {
    try {
      // Cập nhật thông tin người dùng bằng idInfo
      const infoUser = await InfoUser.findOne({where:{idUser}});

      if (!infoUser) {
        throw new AppError('Không tìm thấy thông tin người dùng để cập nhật');
      }
      await infoUser.update(updatedInfoUserData);
      return infoUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteInfoUser(idInfo) {
    try {
      // Xóa thông tin người dùng bằng idInfo
      const infoUser = await InfoUser.findByPk(idInfo);

      if (!infoUser) {
        throw new Error('Không tìm thấy thông tin người dùng để xóa');
      }

      await infoUser.destroy();

      return true; // Trả về true nếu xóa thành công
    } catch (error) {
      throw error;
    }
  }
}

const infoUserService = new InfoUserService();

module.exports = infoUserService;
