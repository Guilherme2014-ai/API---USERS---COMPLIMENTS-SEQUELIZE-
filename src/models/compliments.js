// Dependencies
  const connection = require('../database/index');
  const { Sequelize } = require('sequelize');

// Model's
  const Users = require('./user');
  const Tags = require('./tags');

// Define
  const Compliments = connection.define('compliments', {


    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    user_sender: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    user_receiver: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    
    tag_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }

    
  });

// Config Foreign Key's
  Tags.hasMany(Compliments, { foreignKey: 'tag_id' });
  Compliments.belongsTo(Tags, { foreignKey: 'tag_id', as:'Tag' });

  Users.hasMany(Compliments, { foreignKey: 'user_receiver' });
  Compliments.belongsTo(Users, { foreignKey: 'user_receiver', as:'User Receiver' });

  Users.hasMany(Compliments, { foreignKey: 'user_sender' });
  Compliments.belongsTo(Users, { foreignKey: 'user_sender', as:'User Sender' });

// Others
  Compliments.sync({ force: false }).catch(err=>console.error(err));
  module.exports = Compliments;
//
