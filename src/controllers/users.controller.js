const { respone } = require("../helpers/respones");
const usersService = require("../services/users.service");

const getUsers = async (req, res,next) => {
  try {
    const users = await usersService.getUsers();
    res.status(200).json(respone(users));
  } catch (e) {
    next(e);
  }
};
const getUser=async(req,res,next)=>{
  try {
    // const userId = req.params.id;
    const userId=res.locals.user.idUser;
    const user=await usersService.getUserById(userId);
    res.status(200).json(respone(user));
  } catch (error) {
    next(error);
  }
}

const createUser = async (req, res, next) => {
  const userData = req.body;
  try {
    const user = await usersService.createUser(userData);
    res.status(201).json(respone(user));
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    const user = await usersService.updateUser(userId, newData);
    res.status(201).json(respone(user));
  } catch (e) {
    next(e);
  }
};
const setTokenFcm=async(req, res, next) => {
  const idUser = res.locals.user.idUser;
  const {token} = req.body;
  try {
    const user = await usersService.setTokenFcm(idUser, token);
    res.status(201).json(respone(user));
  } catch (e) {
    next(e);
  }
};
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await usersService.deleteUser(userId);
    res.status(204).json(true);
  } catch (e) {
    next(e);
  }
};


module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  setTokenFcm,
};
