const express = require('express');
const { chuyenKhoan } = require('../../controllers/chuyenKhoan.controller');
const authorization = require('../../middlewares/authorization');

const chuyenKhoanRouter = express.Router();

chuyenKhoanRouter.post('/', authorization,chuyenKhoan);

module.exports=chuyenKhoanRouter;
