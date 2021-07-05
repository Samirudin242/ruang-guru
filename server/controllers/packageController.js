const {Package, User} = require("../models");


class PackageController {
    static getAllPackage(req, res) {
        Package.findAll()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static getPackageByTag(req, res) {
        Package.findAll({
            where: {
                packageTag: req.params.tag
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}


module.exports = PackageController