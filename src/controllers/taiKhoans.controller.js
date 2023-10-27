const { AppError } = require("../helpers/error");
const { respone } = require("../helpers/respones");
const taiKhoansService = require("../services/TaiKhoans.service");

const getTaiKhoans = async (req, res, next) => {
  try {
    const taiKhoans = await taiKhoansService.getTaiKhoans()
    
    res.status(200).json(respone(taiKhoans));
  } catch (error) {
    next(error);
  }
};

const getTaiKhoansByUserId = async (req, res, next) => {
  try {
    const idUser = req.params.id;
    const user= res.locals.user;
    const taiKhoans = await taiKhoansService.getTaiKhoansByUserId(user.idUser);
    res.status(200).json(respone(taiKhoans));
  } catch (error) {
    next(error);
  }
};

const createTaiKhoan = async (req, res, next) => {
  const taiKhoanData = req.body;
  try {
    const taiKhoan = await taiKhoansService.createTaiKhoan(taiKhoanData);
    res.status(201).json(respone(taiKhoan));
  } catch (error) {
    next(error);
  }
};

const updateTaiKhoan = async (req, res, next) => {
  const idTaiKhoan = req.params.idTaiKhoan;
  const newData = req.body;
  try {
    const taiKhoan = await taiKhoansService.updateTaiKhoan(idTaiKhoan, newData);
    res.status(200).json(response(taiKhoan));
  } catch (error) {
    next(error);
  }
};

const deleteTaiKhoan = async (req, res, next) => {
  const idTaiKhoan = req.params.idTaiKhoan;
  try {
    await taiKhoansService.deleteTaiKhoan(idTaiKhoan);
    res.status(204).json(true);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTaiKhoans,
  getTaiKhoansByUserId,
  createTaiKhoan,
  updateTaiKhoan,
  deleteTaiKhoan,
};
