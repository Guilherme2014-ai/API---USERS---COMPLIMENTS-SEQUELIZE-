class Errors{

    execute(status,message){
        return { status,message };
    };

};
module.exports = new Errors();