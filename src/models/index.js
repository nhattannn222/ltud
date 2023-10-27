const { Sequelize } = require("sequelize");
const configs=require("../Config")
const sequelize = new Sequelize(configs.DB_NAME,configs.DB_USER,configs.DB_PASSWORD, {
  dialect: configs.DB_DIALECT,
  host: configs.DB_HOST,
  port: configs.DB_PORT,
});

// Tạo các đối tượng model cho các bảng
const User = require('./User')(sequelize);
const InfoUser = require('./Info')(sequelize);
const TaiKhoan = require('./TaiKhoan')(sequelize);
const Card = require('./Card')(sequelize);
const Bill = require('./Bill')(sequelize);
const BienDong = require('./BienDong')(sequelize);

// Định nghĩa các quan hệ giữa các mô hình
User.hasOne(InfoUser, { foreignKey: 'idUser' });
InfoUser.belongsTo(User, { foreignKey: 'idUser' });

User.hasMany(TaiKhoan, { foreignKey: 'idUser' });
TaiKhoan.belongsTo(User, { foreignKey: 'idUser' });

TaiKhoan.hasMany(Card, { foreignKey: 'idTk' });
Card.belongsTo(TaiKhoan, { foreignKey: 'idTk' });

TaiKhoan.hasMany(BienDong, { foreignKey: 'idTk' });
BienDong.belongsTo(TaiKhoan, { foreignKey: 'idTk' });

Bill.hasMany(BienDong, { foreignKey: 'idBill' });
BienDong.belongsTo(Bill, { foreignKey: 'idBill' });

// Xuất các mô hình để sử dụng trong ứng dụng của bạn
module.exports = {
  sequelize,
  User,
  InfoUser,
  TaiKhoan,
  Card,
  Bill,
  BienDong,
};
