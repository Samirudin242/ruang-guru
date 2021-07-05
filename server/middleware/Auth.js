const jwt = require('jsonwebtoken')
const {User} = require('../models')

class Auth {

    static Authentication(req, res, next) {
        const {token} = req.headers

        if(!token) {
            res.status(400).json({message : `token not found`})
        } else {
            let decode = jwt.verify(token, "12345");
            req.UserData = decode
            User.findOne({
                where: {
                    userId : decode.userId
                }
            })
            .then( data => {
                if(data) {
                    next()
                } else {
                    res.status(403).json({message: `invalid user`})
                }
            })
            .catch(err => {
                res.status(500).json({message: `Internal server error auth`})
            })
        }
    }


}


module.exports = Auth