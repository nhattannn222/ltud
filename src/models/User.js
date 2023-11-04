const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hashPassword);
      },
    },
    phone: {
      unique:true,
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("ADMIN","USER"),
      defaultValue:"USER",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    tokenFcm:{
      type:DataTypes.STRING,
    }
  }, {
    tableName: 'USER',
    timestamps: false,
  });



  return User;
};
