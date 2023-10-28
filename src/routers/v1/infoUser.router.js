const express = require("express");
const { getAllInfoUsers,getInfoUserById,createInfoUser ,updateInfoUser,deleteInfoUser} = require("../../controllers/InfoUser.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requiredRole");

const infoUserRouter = express.Router();

// Tuyến đường lấy danh sách thông tin người dùng
infoUserRouter.get("/", getAllInfoUsers);
// Tuyến đường thông tin người dùng theo id
infoUserRouter.get("/:id", getInfoUserById);
// Tuyến đường tạo mới thông tin người dùng
infoUserRouter.post("/", createInfoUser);
// Tuyến đường cập nhật thông tin người dùng theo ID
infoUserRouter.put("/:id", updateInfoUser);
// Tuyến đường xóa thông tin người dùng theo ID
infoUserRouter.delete("/:id", deleteInfoUser);

module.exports = infoUserRouter;
