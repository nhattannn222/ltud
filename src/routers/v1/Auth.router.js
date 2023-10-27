const express = require('express');
const { login, signIn } = require('../../controllers/auth.contoller');

const authRouter = express.Router();

// Đường dẫn đăng nhập
authRouter.post('/login',login);
authRouter.post("/signIn",signIn)
module.exports = authRouter;
