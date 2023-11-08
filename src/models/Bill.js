const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bill = sequelize.define('Bill', {
    idBill: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    noiDung: {
      type: DataTypes.STRING,
    },
    
    tienGD: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ngayTaoBill: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    trangThai: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  }, {
    tableName: 'BILL',
    timestamps: false,
  });



  return Bill;
};
