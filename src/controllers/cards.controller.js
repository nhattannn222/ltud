const { respone } = require('../helpers/respones');
const cardService = require('../services/cards.service');

const getAllCards = async (req, res, next) => {
  try {
    const cards = await cardService.getAllCards();
    res.status(200).json(respone(cards));
  } catch (error) {
    next(error);
  }
};

const getCardById = async (req, res, next) => {
  try {
    const cardId = req.params.id;
    const card = await cardService.getCardById(cardId);
    res.status(200).json(respone(card));
  } catch (error) {
    next(error);
  }
};
const getCardsByIdUser = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const card = await cardService.getAllCardsByIdUser(user.idUser);
      res.status(200).json(respone(card));
    } catch (error) {
      next(error);
    }
  };
const createCard = async (req, res, next) => {
  const cardData = req.body;
  try {
    const card = await cardService.createCard(cardData);
    res.status(201).json(respone(card));
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  const cardId = req.params.id;
  const newCardData = req.body;
  try {
    const card = await cardService.updateCard(cardId, newCardData);
    res.status(200).json(respone(card));
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  const cardId = req.params.id;
  try {
    await cardService.deleteCard(cardId);
    res.status(204).json(true);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCards,
  getCardById,
  getCardsByIdUser,
  createCard,
  updateCard,
  deleteCard,
};
