const Errors = require('../factory/Errors').execute;
const jwt = require('jsonwebtoken');
const jwtPass = require('../config/pass.json').jwt;

module.exports = async (req,res,next) => {
    try{

        const authentication = req.headers["authorization"];
        if(!authentication) throw Errors(401,"Unathorized");

        const token = String(authentication).replace('Bearer',"").replace(" ","");
    
        const user = jwt.verify(token,jwtPass);
        req.body["user_id"] = user.id;
    
        if(user.rule == false) throw Errors(401,"You aren't a admin !");
        next();

    }catch(err){
        console.error(err);
        throw err;
    };
};