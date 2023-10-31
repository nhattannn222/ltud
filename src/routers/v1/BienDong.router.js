const express = require('express');
const { getBienDongsByIdTk, getAllBienDongs, getBienDongsByIdUser } = require('../../controllers/bienDongs.controller');



const authorization = require('../../middlewares/authorization');


const bienDongRouter = express.Router();

bienDongRouter.get('/', getAllBienDongs);
bienDongRouter.get('/tk/:idTk',authorization, getBienDongsByIdTk);
bienDongRouter.get('/user',authorization, getBienDongsByIdUser);

module.exports = bienDongRouter;
