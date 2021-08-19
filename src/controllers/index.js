// Services
    const userService = require('../services/Users');
    const tagsService = require('../services/CreateTags');
    
    const usersModel = require('../models/user');
    const complimentsModel = require('../models/compliments');
    const tagsModel = require('../models/tags');

// Main
    class Index{

        async user_POST(req,res){    

            const { email,name,password } = req.body;
            const userField = { email,name,password };

            const user = await userService.Create(userField);

            res.json({
                id: user.id,
                email: user.email,
                name: user.name,
                updatedAt: user.updatedAt,
                createdAt: user.createdAt
            });

        };
        async tags_POST(req,res){

            const { name } = req.body;

            const tag = await tagsService.execute(name);

            res.json(tag);

        };
        async userLogin_POST(req,res){

            const { email,password } = req.body;
            const user = { email,password };

            const token = await userService.Login(user);

            res.json({
                token: token
            })
        };
        async compliments_POST(req,res){

            const users = await usersModel.findAll({ include: [complimentsModel] });
            const tags = await tagsModel.findAll({ include: [complimentsModel] });

            res.json({
                users,
                tags
            });
            
        };

    };

// Exports
    module.exports = new Index();