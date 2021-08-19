const connection = require('../database/index');
const sequelize = require('sequelize');

const User = connection.define('users', {

    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
      type: sequelize.STRING,
      allowNull: false
    }

});

//User.hasMany(compliments, { foreignKey: "user_receiver" }) // compliments/foreignKey/user/receiver

User.sync({ force: false }).catch(err=>console.error(err));
module.exports = User;