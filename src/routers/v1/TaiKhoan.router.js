const express = require("express");
const taiKhoansController = require("../../controllers/taiKhoans.controller");
const authorization = require("../../middlewares/authorization");

const taiKhoansRouter = express.Router();

// Tuyến đường lấy danh sách tài khoản
taiKhoansRouter.get("/", taiKhoansController.getTaiKhoans);

// Tuyến đường lấy tài khoản theo ID
taiKhoansRouter.get("/:id", authorization, taiKhoansController.getTaiKhoansByUserId);

// Tuyến đường tạo mới tài khoản
taiKhoansRouter.post("/", taiKhoansController.createTaiKhoan);

// Tuyến đường cập nhật tài khoản theo ID
taiKhoansRouter.put("/:id",authorization, taiKhoansController.updateTaiKhoan);

// Tuyến đường xóa tài khoản theo ID
taiKhoansRouter.delete("/:id", taiKhoansController.deleteTaiKhoan);

module.exports = taiKhoansRouter;
