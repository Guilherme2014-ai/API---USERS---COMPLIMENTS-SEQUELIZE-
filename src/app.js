// Dependencies
    require('express-async-errors');
    const express = require('express');
    const app = express();

// Controllers
    const controller = require('./controllers/index');   

// Database Conection
    const connection = require('./database/index');
    connection.authenticate().then(() => { console.log('Database Connected !') }).catch(err=>console.error(err));

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
    app.get('/compliments', controller.compliments_POST);

// Middlewares / Sempre Por depois
    app.use(validation);

// Others
module.exports = app;