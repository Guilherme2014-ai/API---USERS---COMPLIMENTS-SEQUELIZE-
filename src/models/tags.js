const connection = require('../database/index');
const sequelize = require('sequelize');

const Tags = connection.define('tags', {

    name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }

});

//Tags.hasMany(Compliments, { foreignKey: "tag_id" });

Tags.sync({ force: false }).catch(err=>console.error(err));
module.exports = Tags;