const { Sequelize } = require('sequelize');
const DBS_CONFIG = require('../config/config.json').development;

const connection = new Sequelize(DBS_CONFIG);

module.exports = connection;