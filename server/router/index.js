const router = require("express").Router();
const PackageController = require("../controllers/packageController");
const UserController = require("../controllers/userController");
const CartController = require("../controllers/userCartController");
const Auth = require("../middleware/Auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/allUser", UserController.getAllUser);
router.get("/getUser/:id", UserController.getUserById)

router.get("/packages", PackageController.getAllPackage);
router.get("/package/:tag", PackageController.getPackageByTag);

router.put("/updateCart/:id", CartController.updateCart);
router.delete("/deleteCart/:id", CartController.delete);

router.use(Auth.Authentication);
router.post("/addPackage/:id", UserController.addPackage);
router.get("/getUserData", UserController.getUser);


module.exports = router;