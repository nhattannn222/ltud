const express = require('express');
const { getBienDongsByIdTk, getAllBienDongs, getBienDongsByIdUser } = require('../../controllers/bienDongs.controller');



const authorization = require('../../middlewares/authorization');


const bienDongRouter = express.Router();

bienDongRouter.get('/', getAllBienDongs);
bienDongRouter.get('/:idTk',authorization, getBienDongsByIdTk);
bienDongRouter.get('/user/:id',authorization, getBienDongsByIdUser);

module.exports = bienDongRouter;
