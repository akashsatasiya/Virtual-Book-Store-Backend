const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const auth_key  = process.env.JWT_KEY+req.params.userId;
        console.log(auth_key);
        const decoded = jwt.verify(token, auth_key);
        req.userData = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: 'Token Failed'
        })
    }    

}
