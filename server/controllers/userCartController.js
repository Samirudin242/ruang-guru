const {userCart} = require("../models");


class UserCartController {
    static delete (req, res) {
        userCart.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({message: "Succesfully delete data"})
        })
    }

    static updateCart (req, res) {
        userCart.findByPk(req.params.id)
        .then(data => {
            let object = {
                packageName: data.packageName,
                packageSerial: data.packageSerial,
                packageTag: data.packageTag,
                orderStatus: "SUCCESS",
            }

            userCart.update(object, {where: {id: req.params.id}})
            .then(data => {
                res.status(200).json({data, message: "succesfully update cart"});
            })
            .catch(err => {
                res.status(500).json({err})
            })
        })
    }

    
}


module.exports = UserCartController