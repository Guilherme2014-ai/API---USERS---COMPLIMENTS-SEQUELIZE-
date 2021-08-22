// Services
    const userService = require('../services/Users');
    const tagsService = require('../services/CreateTags');    
    const complimentsService = require('../services/Compliments');

// Models
    const complimentsModel = require('../models/compliments');

// Main
    class Index{

        async user(req,res){
            try{

                const users = await userService.findAll({
                    include: [
                        {
                            model: complimentsModel, as: "Receiveds"
                        },
                        {
                            model: complimentsModel, as: "Sent"
                        }
                    ]
                });

                res.json({ users });

            }catch(err){
                console.error(err);
                throw err;
            };
        };
        async user_POST(req,res){    

            const { email,name,password } = req.body;
            const userField = { email,name,password };

            const user = await userService.Create(userField);

            res.json({
                id: user.id,
                email: user.email,
                name: user.name,
                rule: user.rule,
                updated_at: user.updated_at,
                created_at: user.created_at
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

            res.json({ token })
        };
        async compliments_POST(req,res){

            try{

                const { message,/*user_sender*/user_receiver,tag_id } = req.body;
                const compliment = { message,user_receiver,tag_id };
                const token = String(req.headers["authorization"]).replace('Bearer',"").replace(" ", "");

                const created = await complimentsService.execute(compliment,token);

                res.json({ created });

            } catch(err){
                console.error(err);
                throw err;
            };
            
        };
        async compliments_sent(req,res){
            try{

                const idUser = req.body['user_id'];
                const sentCompliments = await complimentsModel.findAll({ where: { user_sender: idUser } });

                res.json({ sent_compliments: sentCompliments });

            }catch(err){
                console.error(err);
                throw err;
            };
        };
        async compliments_receiveds(req,res){
            try{

                const idUser = req.body['user_id'];
                const receivedCompliments = await complimentsModel.findAll({ where: { user_receiver: idUser } });

                res.json({ received_compliments: receivedCompliments });

            }catch(err){
                console.error(err);
                throw err;
            };
        };

    };

// Exports
    module.exports = new Index();
//