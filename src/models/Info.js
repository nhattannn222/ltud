const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const InfoUser = sequelize.define('InfoUser', {
    idInfo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // idUser: {
    //   type: DataTypes.INTEGER,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Không được rỗng
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Không được rỗng
      },
    },
    gioitinh: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notEmpty: true, // Không được rỗng
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Không được rỗng
        is: {
          args: /^0[0-9]{9}$/, // Điện thoại bắt đầu bằng số 0 và có 10 chữ số
          msg: 'Số điện thoại không hợp lệ',
        },
      },
    },
    sex: {
      type: DataTypes.TINYINT,
    },
    CCCD: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[0-9]{12}$/, // CCCD phải có 13 số
          msg: 'CCCD phải có 12 số',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email không hợp lệ',
        },
      },
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true, // Kiểm tra xem ngày có đúng định dạng ngày tháng không
        isOlderThan16(value) {
          const currentDate = new Date();
          const birthDate = new Date(value);
          const age = currentDate.getFullYear() - birthDate.getFullYear();
          if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
          ) {
            if (age < 16) {
              throw new Error('Tuổi phải từ 16 trở lên.');
            }
          }
        },
      },
    },
  }, {
    tableName: 'INFOUSER',
    timestamps: false,
  });

  return InfoUser;
};
