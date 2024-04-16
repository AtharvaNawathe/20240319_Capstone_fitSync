const express = require('express');
const router = express.Router();

// internal imports
const UserController = require("../controllers/userController")
const { verifyToken} = require("../middlewares/auth");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Defines routes for user management operations.
 *
 * This router handles various user-related API endpoints, including:
 *  - signup
 *  - login
 *  - forgotpassword
 *  - reset_password
 *  - getProfileDetails (requires valid JWT token)
 *  - editProfile (requires valid JWT token)
 *  - getprofile (requires valid JWT token)
 *
 * @module userRoutes
 */
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/forgotpassword',UserController.forget_password)
router.post('/resetpassword',UserController.reset_password);
router.put('/editprofile', verifyToken, UserController.editProfile);
router.get('/getprofile', verifyToken, UserController.getUserDetails);

module.exports = router;