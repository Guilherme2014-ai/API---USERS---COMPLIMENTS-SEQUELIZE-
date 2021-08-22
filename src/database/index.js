// Dependencies
    const { Sequelize } = require('sequelize'); // Desestruturacao ES6 Necessaria para tipagem do Sequelize
    const dbConfig = require('../config/config.json').development;
    
// Connection
    const connection = new Sequelize(dbConfig);

// Exports
    module.exports = connection;
//