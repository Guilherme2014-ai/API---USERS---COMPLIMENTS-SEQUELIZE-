const Errors = require('../factory/Errors').execute;

module.exports = (req,res,next) => {
    // A fazer JWT...

    const admin = true;

    if(admin == false) throw Errors(401,"You aren't a admin !");

    next();
};