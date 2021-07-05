'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Package extends Model {}
  Package.init({
    packageName: DataTypes.STRING,
    packageSerial: DataTypes.STRING,
    packageTag: DataTypes.STRING,
    orderStatus: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {sequelize});
  Package.associate = function(models) {
    // associations can be defined here
    
  };
  return Package;
};