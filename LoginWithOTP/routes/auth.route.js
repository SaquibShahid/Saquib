const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");
const authController = require("../controllers/auth.controller");


router.post("/register", authController.createNewUser);

router.post("/login_with_phone", authController.loginWithPhoneOtp);

router.post("/verify", authController.verifyPhoneOtp);

router.get("/me", checkAuth,  authController.fetchCurrentUser);

router.get("/admin", checkAuth, checkAdmin,  authController.handleAdmin);


module.exports = router;