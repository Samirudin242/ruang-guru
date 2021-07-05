const {User, Package, userCart} = require("../models");
const jwt = require("jsonwebtoken");

class UserController {
    static register(req, res) {
        let dataUser = {
          userId: req.body.userId,
          userName: req.body.userName,
          userEmail: req.body.userEmail,
          userPhoneNumber: req.body.userPhoneNumber
        };
        User.findOne({
          where: {
            userId: dataUser.userId,
          },
        }).then((data) => {
          if (data) {
            res.status(404).json({ message: `User already exist, please login` });
          } else {
            User.create(dataUser)
              .then((data) => {
                res
                  .status(201)
                  .json({ message: `Succesfully register a new user`, data: data });
              })
              .catch((err) => {
                res.status(500).json({ message: err });
              });
          }
        });
      }


      static login(req, res) {
        let obj  = {
            userId : req.body.userId,
        }

        User.findOne({
            where: {
                userId :req.body.userId
            }
        })
        .then(data => {
            if(data) {
                const token = jwt.sign({id: data.id, userId: data.userId, userName: data.userName, userEmail: data.userEmail}, "12345")
                res.status(200).json({token: token, data})
            } else {
                res.status(404).json({message: "user not found"})
            }
            
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }


    static getAllUser(req, res) {
        console.log("masuk");
        User.findAll({
            include: [userCart],
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }

    static getUserById(req, res) {
        User.findByPk(req.params.id, {
            include: [userCart]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getUser(req, res) {
        User.findOne({
            where: {
                userId: req.UserData.userId
            },
            include: [userCart]
        })
        .then(data => {
            if(data) {
                res.status(200).json({
                    status: "success",
                    message: "User found",
                    user: data,
                })
            } else {
                res.status(404).json({status: "error", message:"User not found"})
            }
        }).
        catch(err => {
            res.status(500).json({status: "error", message: "internal server error"})
        })
    }


    static addPackage(req, res) {
        Package.findByPk(req.params.id)
        .then(data => {
            let packageData = {
               packageName : data.packageName,
               packageSerial : data.packageSerial,
               packageTag : data.packageTag,
               orderStatus : "IN_PROGRESS",
               UserId : req.UserData.id
            }
            userCart.findOne({
                where: {
                    packageSerial: data.packageSerial,
                }
            })
            .then(data => {
                if(data) {
                    res.status(403).json({message: "Package already added"})
                } else {
                    userCart.create(packageData)
                    .then(data => {
                        res.status(200).json({message: "succes add package to cart", data})
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController;