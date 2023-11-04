const express = require("express");
const { getUsers, createUser, updateUser, deleteUser, getUser, setTokenFcm } = require("../../controllers/users.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requiredRole");

const userRouter = express.Router();

// Tuyến đường lấy danh sách người dùng
userRouter.get("/", getUsers);
// Tuyến đường người dùng theo id
userRouter.get("/:id",authorization,getUser);
// Tuyến đường tạo mới người dùng
userRouter.post("/", createUser);
userRouter.post("/fcm",setTokenFcm );
// Tuyến đường cập nhật người dùng theo ID
userRouter.put("/:id", updateUser);

// Tuyến đường xóa người dùng theo ID
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
