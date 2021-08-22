// Services
    const userService = require('../services/Users');
    const tagsService = require('../services/CreateTags');    
    const complimentsService = require('../services/Compliments');

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

            res.json({
                token: token
            })
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
        async receiveds(req,res){
            try{

                const authentication = req.body["authentication"];

            }catch(err){
                console.error(err);
                throw err;
            };
        };

        async test(req,res){
            const users = await userService.findAll({
                attributes: ['id','name', 'email','created_at','updated_at']
            });

            res.json({ users });
        };

    };

// Exports
    module.exports = new Index();
//