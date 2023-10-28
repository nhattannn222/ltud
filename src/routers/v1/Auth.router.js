const express = require('express');
const { login, signIn, changePassword } = require('../../controllers/auth.contoller');
const authorization = require('../../middlewares/authorization');

const authRouter = express.Router();

// Đường dẫn đăng nhập
authRouter.post('/login',login);
authRouter.post("/signIn",signIn);
authRouter.post("/changePassword",authorization,changePassword);
module.exports = authRouter;
