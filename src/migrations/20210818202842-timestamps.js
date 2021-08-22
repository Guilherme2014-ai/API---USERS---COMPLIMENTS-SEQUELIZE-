'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface
    return queryInterface.createTable('compliments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },


      message: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: new Date()
      },
      

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }).then(() => {

      return queryInterface.createTable('users', {
        
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
  
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
  
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
  
        rule: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
  
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
  
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date()
        },
  
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date()
        }

      }).then(() => {
        return queryInterface.createTable('tags', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
    
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
    
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
          },
    
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
          }
        }).catch(err => console.error(err));
      }).catch(err => { console.error(err) });
    });


  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('compliments').then(() => {
      return queryInterface.dropTable('users').catch(err => { console.error(err) });
    })
  }
};