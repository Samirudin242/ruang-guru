'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class userCart extends Model {}
  userCart.init({
    packageName: DataTypes.STRING,
    packageSerial: DataTypes.STRING,
    packageTag: DataTypes.STRING,
    orderStatus: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {sequelize});
  userCart.associate = function(models) {
    // associations can be defined here
    userCart.belongsTo(models.User, {
      sourceKey: "UserId",
      targetKey: "id",
    })
  };
  return userCart;
};