const { respone } = require("../helpers/respones");
const infoUserService = require("../services/InfoUser.service");

const getAllInfoUsers = async (req, res, next) => {
  try {
    const infoUsers = await infoUserService.getAllInfoUsers();
    res.status(200).json(respone(infoUsers));
  } catch (e) {
    next(e);
  }
};

const getInfoUserByIdUser = async (req, res, next) => {
  try {
    const infoUserId = req.params.id;
    const infoUser = await infoUserService.getInfoUserById(infoUserId);
    res.status(200).json(respone(infoUser));
  } catch (e) {
    next(e);
  }
};
const getInfoUserByIdTk = async (req, res, next) => {
  try {
    const idTk = req.params.id;
    const infoUser = await infoUserService.getInfoUserByIdTk(idTk);
    res.status(200).json(respone(infoUser));
  } catch (e) {
    next(e);
  }
};

const createInfoUser = async (req, res, next) => {
  const infoUserData = req.body;
  try {
    const infoUser = await infoUserService.createInfoUser(infoUserData);
    res.status(201).json(respone(infoUser));
  } catch (e) {
    next(e);
  }
};

const updateInfoUser = async (req, res, next) => {
  const infoUserId = res.locals.user.idUser;
  const updatedInfoUserData = req.body;
  try {
    const infoUser = await infoUserService.updateInfoUser(infoUserId, updatedInfoUserData);
    res.status(200).json(respone(infoUser));
  } catch (e) {
    next(e);
  }
};

const deleteInfoUser = async (req, res, next) => {
  try {
    const infoUserId = req.params.id;
    await infoUserService.deleteInfoUser(infoUserId);
    res.status(200).json(true); 
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllInfoUsers,
  getInfoUserByIdUser,
  createInfoUser,
  updateInfoUser,
  deleteInfoUser,
  getInfoUserByIdTk,
};
