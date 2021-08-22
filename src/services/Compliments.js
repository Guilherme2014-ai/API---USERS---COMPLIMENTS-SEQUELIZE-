const usersModel = require('../models/user');
const complimentsModel = require('../models/compliments');
const jwt = require('jsonwebtoken');

const Errors = require('../factory/Errors').execute;

class Compliments {

    async execute(compliment,token) {
        try{

            const user = this.decoder(token);

            compliment["user_sender"] = user.id;
            await this.validation(compliment);

            const created = await complimentsModel.create(compliment);

            return ({
                id: created.id,
                message: created.message,
                created_at: created.createdAt,
                updated_at: created.createdAt
            });

        }catch(err){
            console.error(err);
            throw err;
        };
    };
    decoder(token){
        try{ return jwt.decode(token) }

        catch(err){
            console.error(err);
            throw err;
        };
    };
    async validation(compliment){
        try{

            if(!compliment.message || !compliment.message || !compliment.user_receiver || !compliment.user_sender || !compliment.tag_id) throw Errors(400,"Some Field wasn't fellid !");
            if(compliment.message == "" || compliment.message == "" || compliment.user_receiver == "" || compliment.user_sender == "" || compliment.tag_id == "") throw Errors(400,"Some Field wasn't fellid !");
    
            if(compliment.user_receiver == compliment.user_sender) throw Errors(400, "You Can't Make a Compliment For Yourself haha.")
    
            const user_receiverExists = await usersModel.findByPk(compliment.user_receiver) != null, user_senderExists = await usersModel.findByPk(compliment.user_sender) != null;
    
            if(user_receiverExists == false || user_senderExists == false) throw Errors(400,"User receiver / User Sender Doesn't Exists !");

        } catch(err){
            console.error(err);
            throw err
        };
    };
};
module.exports = new Compliments();