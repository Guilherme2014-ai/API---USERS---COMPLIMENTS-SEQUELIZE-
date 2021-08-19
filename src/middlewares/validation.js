module.exports = (err,req,res,next) => {

    if(err){
        const { status,message } = err;

        if(!status){
            
            return res.status(500).json({
                status: 500,
                message: `${message}`
            });

        } else {
            
            return res.status(status).json({
                status: status,
                message: `${message}`
            });

        };
    };

};