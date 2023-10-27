const { respone } = require('../helpers/respones');
const bienDongService = require('../services/BienDongs.service');

const getAllBienDongs = async (req, res, next) => {
  try {
    const bienDongs = await bienDongService.getAllBienDongs();
    res.status(200).json(respone(bienDongs));
  } catch (error) {
    next(error);
  }
};

const getBienDongsByIdTk  = async (req, res, next) => {
    try {
        const idTk = req.params.idTk;
        const idUser=res.locals.user.idUser;
      const bienDongs = await bienDongService.getBienDongsByIdTk(idTk,idUser);
      res.status(200).json(respone(bienDongs));
    } catch (error) {
      next(error);
    }
  };
  
  const getBienDongsByIdUser  = async (req, res, next) => {
    try {
        const user = res.locals.user;
      const bienDongs = await bienDongService.getBienDongsByIdUser(user.idUser);
      res.status(200).json(respone(bienDongs));
    } catch (error) {
      next(error);
    }
  };
module.exports = {
  getAllBienDongs,
  getBienDongsByIdTk,
  getBienDongsByIdUser,
};
