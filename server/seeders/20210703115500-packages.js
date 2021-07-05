
const packages = require("../data/packages.json");
packages.forEach((package) => {
  package.createdAt = new Date();
  package.updatedAt = new Date();
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Packages", packages, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Packages", null, {});
  }
};
