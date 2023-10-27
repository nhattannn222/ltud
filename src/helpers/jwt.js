const jwt = require("jsonwebtoken");
const configs=require("../Config")
const EXPIRES_IN = 60*60*12;

const generateToken = (payload) => {
   const token = jwt.sign({
      id: payload.idUser,
      password: payload.password,
   }, configs.SECRET_KEY, {
      expiresIn: "12h",
   });
   
   return {
      token,
      expiresIn: EXPIRES_IN,
   };
}

module.exports = {
   generateToken,
}
