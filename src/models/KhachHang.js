const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('khachHang', {
    idKhachHang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
    },
    dayCreate: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: "khach_hangs",
    timestamps: false,
  });
}
