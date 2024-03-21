const express = require('express');
const router = express.Router();

// internal imports
const UserController = require("../controllers/userController")
const { verifyToken} = require("../middlewares/auth");
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/forgotpassword',UserController.forget_password)
router.post('/reset_password',UserController.reset_password)
router.get('/profiledetails',verifyToken, UserController.getProfileDetails)
router.put('/goal', verifyToken, UserController.updateGoal);
router.put('/editprofile', verifyToken, UserController.editProfile);
router.put('/personaldetails', UserController.personalDetails);

module.exports = router;