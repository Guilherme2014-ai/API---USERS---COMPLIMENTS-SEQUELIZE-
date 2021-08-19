const tagsModel = require('../models/tags');
const Errors = require('../factory/Errors').execute;

class CreateTags{

    async execute(name){

        try{

            if(!name || name == "") throw Errors(400,"Name is Undefined or Empty !");

            const alreadyExists = await tagsModel.findOne({ where: { name } });
    
            if(alreadyExists) throw Errors(400,"This Tag already exists !");
    
            return await tagsModel.create({ name });

        } catch(err){
            console.error(`
            
            
            ${err}
            
            
            `);
            throw err
        };

    };

};
module.exports = new CreateTags();