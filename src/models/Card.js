const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Card = sequelize.define('Card', {
    idCard: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    // idTk: {
    //   type: DataTypes.INTEGER,
    // },
    ngayHetHan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    loaiCard: {
      type: DataTypes.ENUM("master","visa","debit"),
      allowNull: false,
    },
  }, {
    tableName: 'CARD',
    timestamps: false,
  });

 
  return Card;
};
