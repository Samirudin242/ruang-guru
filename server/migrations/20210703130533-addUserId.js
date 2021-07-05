'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.addColumn('Packages', "UserId", { type: Sequelize.INTEGER });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Packages', "UserId");
  }
};
