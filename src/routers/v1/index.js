const express =require("express");

const userRouters = require("./User.router")
const authRouter = require("./Auth.router");
const authorization = require("../../middlewares/authorization");
const { getProFile } = require("../../controllers/auth.contoller");
const { upload } = require("../../controllers/Upload.controller");
const uploadMiddelware = require("../../middlewares/upload");
const taiKhoansRouter = require("./TaiKhoan.router");
const cardRouter = require("./cards.router");
const bienDongRouter = require("./BienDong.router");
const chuyenKhoanRouter = require("./ChuyenKhoan.router");
const infoUserRouter = require("./infoUser.router");
//path v1: /api/v1

const v1=express.Router();
v1.use("/auth",authRouter);
v1.use("/users",userRouters);
v1.use("/taiKhoans",taiKhoansRouter);
v1.use("/cards",cardRouter);
v1.use("/bds",bienDongRouter);
v1.use("/ck",chuyenKhoanRouter);
v1.use("/info",infoUserRouter);
//demo
// v1.get("/profiles",authorization,getProFile())
//dinh nghia router cho upload
v1.post("/upload",uploadMiddelware.single("file"),upload())
module.exports =v1;