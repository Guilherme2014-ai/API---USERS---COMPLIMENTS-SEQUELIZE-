const bcrypt = require('bcrypt');
const Errors = require('../factory/Errors').execute;
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const pass = require('../config/pass.json');

class CreateUsers {

    async Create(userField){
        try{
            
            await this.Validation(userField);
            
            userField["rule"] = false;
            userField["password"] = await bcrypt.hash(userField["password"], 10);
            
            return await userModel.create(userField);

        } catch(err){
            console.error(`
            
            
            ${err}
            
            
            `);
            throw err
        }

    };
    async Login(userField){
        try{
            
            const user = await this.ValidationLogin(userField);

            return await jwt.sign(
                {
                id: user.id,
                name: user.name,
                email: user.email,
                rule: user.rule,
                },
                pass.jwt,
                {
                    subject: `${user.id}`,
                    expiresIn: "1d"
                }
            );

        } catch(err){
            console.error(`
            
            
            ${err}
            
            
            `);
            throw err
        }

    };
    async findAll(params){
        try{

            return await userModel.findAll(params);
            
        } catch(err){
            console.error(err);
            throw Errors(500,err);
        }
    };

    async Validation(userField){
        const { name,email,password } = userField;

        if(!name || !email || !password) throw Errors(400,'Bad Request !');
        
        const userAlreadyExists = await userModel.findOne({ where: { email } }); // Expected: Null

        if(userAlreadyExists) throw Errors(400,'User Already Exists !'); // 'Throw' -> leva para o 'Cath' -> leva para a camada anterior, nesse caso ele cria um 'err' no middleware | OBS: Throw sempre leva ao erro
    };
    async ValidationLogin(userField){
        const { email,password } = userField;

        if(!email || !password) throw Errors(400,'Bad Request !');
        
        const user = await userModel.findOne({ where: { email } }); // Expected: Null

        console.log(user);

        if(!user) throw Errors(400,"Email / Pass is Wrong !"); // 'Throw' -> leva para o 'Cath' -> leva para a camada anterior, nesse caso ele cria um 'err' no middleware | OBS: Throw sempre leva ao erro

        const samePass = await bcrypt.compare(password,user["password"]);

        if(!samePass) throw Errors(400,"Email / Pass is Wrong !");

        return user

    };

};

module.exports = new CreateUsers();