const jwt = require('jsonwebtoken');

const authWare = (req,res,next) =>{

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(token){
        try {
            const decoded = jwt.verify(token, 'secret1234');
        
            req.userId = decoded._id
            next() 
        } catch (error) {           
            return res.status(404).json({
                success:false,
                message:"Dostup Senga Yoq"
            })
        }
    }else{
        return res.status(404).json({
            message:"Dostup yoq senga"
        })
    }

}

module.exports = authWare;