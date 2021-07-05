'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class User extends Model {};
  User.init({
    userId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "user id can't be empty"
        }
      }
    },
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "username can't be empty"
        }
      }
    },
    userEmail: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "email can't be empty"
        }
      }
    },
    userPhoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "phone number can't be empty"
        }
      }
    },
  }, {sequelize});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.userCart)
  };
  return User;
};