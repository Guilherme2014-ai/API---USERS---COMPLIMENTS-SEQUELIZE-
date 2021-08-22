'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn('compliments','created_at', {

        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

    }).then(() => {
      return queryInterface.addColumn('compliments','updated_at', {

        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      }).catch(err=>console.error(err));
    }).catch(err=>console.error(err));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'compliments', // name of Source model
      'created_at' // key we want to remove
    ).then(() => {
      return queryInterface.removeColumn(
        'compliments', // name of Source model
        'updated_at' // key we want to remove
      ).catch(err=>console.error(err));
    }).catch(err => console.error(err));
  }
};
