const { AppError } = require('../helpers/error');
const { Card, User, TaiKhoan } = require('../models'); // Import model Card

class CardService {
  async getAllCards() {
    try {
      const cards = await Card.findAll();
      return cards;
    } catch (error) {
      throw error;
    }
  }
  async getAllCardsByIdUser(idUser) {
    try {
      // Sử dụng Sequelize để truy vấn dữ liệu
      const taiKhoans = await TaiKhoan.findAll({
        where: { IDUSER: idUser }, // Lọc tài khoản của người dùng dựa trên idUser
        include: [
          {
            model: Card, // Kết nối với bảng Card
            as: 'Cards', // Bí danh cho mối quan hệ
          },
        ],
      });
  
      // Lấy danh sách tất cả các thẻ từ tài khoản của người dùng
      const allCards = [];
      taiKhoans.forEach((taiKhoan) => {
        taiKhoan.Cards.forEach((card) => {
          allCards.push(card);
        });
      });
  
      return allCards;
    } catch (error) {
      throw error;
    }
  }
  async getCardById(cardId) {
    try {
      const card = await Card.findByPk(cardId);
      if (!card) {
        throw new AppError(404,'Card not found');
      }
      return card;
    } catch (error) {
      throw error;
    }
  }

  async createCard(cardData, options = {}) {
    try {
      const card = await Card.create(cardData, { transaction: options.transaction });
      return card;
    } catch (error) {
      throw error;
    }
  }
  

  async updateCard(cardId, newCardData) {
    try {
      const card = await Card.findByPk(cardId);
      if (!card) {
        throw new AppError(404,'Card not found');
      }

      await card.update(newCardData);
      return card;
    } catch (error) {
      throw error;
    }
  }

  async deleteCard(cardId) {
    try {
      const card = await Card.findByPk(cardId);
      if (!card) {
        throw new AppError(404,'Card not found');
      }

      await card.destroy();
    } catch (error) {
      throw error;
    }
  }
}

const cardService = new CardService();

module.exports = cardService;
