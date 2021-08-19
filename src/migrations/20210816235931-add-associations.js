'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    

    return queryInterface.addColumn(
      'compliments', // nome do model.
      'user_sender', // nome do campo que queremos adicionar.
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Nome do Model Alvo.
          key: 'id', // Nome do campo que estamos nos referenciando no model alvo.
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }

    ).then(() => {

      return queryInterface.addColumn(
        'compliments', // nome do model.
        'user_receiver', // nome do campo que queremos adicionar.
        {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },

          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }

      ).then(() => {

        return queryInterface.addColumn(
          'compliments', // nome do model.
          'tag_id', // nome do campo que queremos adicionar.
          {
            type: Sequelize.INTEGER,
    
            references: { model: 'tags', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }

        ).then(() => {
          console.log('Sucesso !')

        }).catch(err => console.error(err));

      }).catch(err => console.error(err));
      
    }).catch(err => console.error(err));


  },

  down: (queryInterface, Sequelize) => {


    return queryInterface.removeColumn(
      'compliments', // name of Source model
      'user_sender' // key we want to remove

    ).then(() => {

      return queryInterface.removeColumn(
        'compliments', // name of Source model
        'user_receiver' // key we want to remove

      ).then(() => {

        return queryInterface.removeColumn(
          'compliments', // name of Source model
          'tag_id' // key we want to remove

        ).catch(err => console.error(err));
      })
    }).catch(err => console.error(err));


  }
};