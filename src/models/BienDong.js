const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BienDong = sequelize.define('BienDong', {
    idBD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // idTk: {
    //   type: DataTypes.INTEGER,
    // },
    // idBill: {
    //   type: DataTypes.INTEGER,
    // },
    soDu: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    loaiBD: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  }, {
    tableName: 'BIENDONG',
    timestamps: false,
  });

  

  return BienDong;
};
