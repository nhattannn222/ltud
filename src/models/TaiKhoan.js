const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TaiKhoan = sequelize.define('TaiKhoan', {
    idTk: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // idUser: {
    //   type: DataTypes.INTEGER,
    // },
    dateCreate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    maPin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tinhTrang: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    soDu: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    loaiTK: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'TAIKHOAN',
    timestamps: false,
  });

  

  return TaiKhoan;
};
