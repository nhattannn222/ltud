const express = require('express');
const {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    getCardsByIdUser,
  } = require('../../controllers/cards.controller');
const authorization = require('../../middlewares/authorization');


const cardRouter = express.Router();

cardRouter.get('/', authorization,getAllCards);
cardRouter.get('/:id', getCardById);
cardRouter.get('/user/:id',authorization, getCardsByIdUser);
cardRouter.post('/', createCard);
cardRouter.put('/:id', updateCard);
cardRouter.delete('/:id', deleteCard);

module.exports = cardRouter;
