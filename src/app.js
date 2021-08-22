// Dependencies
    require('express-async-errors'); // Sem isso o Middleware de Capitacao de erro nao funciona.
    const express = require('express');
    const app = express();

// Database Conection
    const connection = require('./database');
    const compliments = require('./models/compliments');
    const tags = require('./models/tags');
    const users = require('./models/user');

    connection.authenticate().then(() => { console.log('Database Connected !') }).catch(err=>console.error(err));

    compliments.init(connection);
    tags.init(connection);
    users.init(connection);

    compliments.associate(connection.models);
    tags.associate(connection.models);
    users.associate(connection.models);

    // connection.sync({ force: false }).catch(err => console.error(err));

// Controllers
    const controller = require('./controllers');

// Config
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // Sempre por Primeiro.

// Middlewares Dependencies
    const validation = require('./middlewares/validation');
    const authentication = require('./middlewares/auth');
    
// Routes | Dependendo da complexidade posso evoluir para uma Router
    app.post('/users', controller.user_POST);
    app.post('/tags', authentication, controller.tags_POST);
    app.post('/login', controller.userLogin_POST);
    app.post('/compliments', authentication, controller.compliments_POST);

    app.get('/compliments/receiveds', authentication, controller.compliments_receiveds);
    app.get('/compliments/sent', authentication, controller.compliments_sent);
    app.get('/users', authentication, controller.user);

// Middlewares / Sempre Por depois
    app.use(validation);

// Others
module.exports = app;