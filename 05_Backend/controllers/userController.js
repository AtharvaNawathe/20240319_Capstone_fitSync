// Imported necessary modules
const User = require('../models/user_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { verifyToken} = require("../middlewares/auth");
const config = require("../config/config");
const { validateInputs } = require('../validators/user_validators');
dotenv.config();


/**
 * Sign up a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The response object.
 */
const signup = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);

    // Validate user data
    const validationError = validateInputs(userData);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Check if the user already exists with the provided email or phone number
    const existingUser = await User.findOne({
    $or: [{ email: userData.email }, /*{ phone_number: userData.phone_number }*/],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "An account already exists with the provided email.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Create a new user
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User signed up successfully!",
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Login a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The response object.
 */
const login = async (req, res) => {
  try {
    const userData = req.body;
    const username = userData.username;
    const password = userData.password;

   
    const validationError = validateInputs(userData);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // If the password is valid, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, userType: user.user_type, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        username: user.username,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Send a reset password email.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The response object.
 */
const forget_password = async (req, res) => {
  try {
    // Extracting the email from the request body
    const email = req.body.email;
    
    // Finding user data based on the provided email
    const userData = await User.findOne({ email: email }, { username: 1, email: 1 });

    // If user data is found
    if (userData) {
      // Generating a random string
      const randomString = randomstring.generate();
      
      // Updating the user's record with the generated token
      const data = await User.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );

    

      // Sending the reset password email
      sendResetPasswordMail(userData.username, userData.email, randomString);

      // Sending a success response
      res.status(200).send({ success: true, msg: "Check mail and reset password!" });
    } else {
      // Sending a success response if email does not exist
      res.status(200).send({ success: true, msg: "Email does not exist" });
    }
  } catch (error) {
    // Handling errors and sending an error response if an exception occurs
    res.status(400).send({ success: false, msg: error.message });
  }
};

/**
 * Send a reset password email.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} token - The reset password token.
 */
const sendResetPasswordMail = async (name, email, token) => {
  try {
    // Creating a transporter for sending emails using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: config.emailUser,  // Your Gmail username
        pass: config.emailPassword,  // Your Gmail password
      },
        tls: {
          ciphers:'SSLv3'
      }
    });

    // Mail options for the reset password email
    const mailOptions = {
      from: config.emailUser,  // Sender's email address
      to: email,  // Recipient's email address
      subject: "For reset password",  // Email subject
      // Email body in HTML format
      html: `
        <p>Hi ${name},</p>
        <p>Please click the link below to reset your password:</p>
        <a href=http://localhost:4200/resetpassword?token=${token}>Reset password</a>
      `
    };

    // Sending the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // Log an error if sending the email fails
        console.log(error);
      } else {
        // Log a success message if the email is sent successfully
        console.log("Mail Has been sent:-", info.response);
      }
    });
  } catch (error) {
    // Handling errors and sending an error response if an exception occurs
    res.status(400).send({ success: false, msg: error.message });
  }
};   

/**
 * Resets the user password 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The response object.
 */
const reset_password = async (req, res) => {
  try {
    // Extracting the token from the query parameters
    const token = req.query.token;
    console.log(token);
    
    
    // Finding user data based on the provided token
    const tokenData = await User.findOne({ token: token });
    console.log(tokenData);

    // If token data is found and it's not expired
    if (tokenData && !isTokenExpired(tokenData.tokenTimestamp)) {
      // Extracting the new password from the request body  
      const password = req.body.password;
      
      // Hashing the new password using bcrypt
      const newPass = await bcrypt.hash(password, 10);

      // Updating the user's record with the new password and clearing the token
      const userdata = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPass, token: "" } },
        { new: true }
      );

      // Sending a success response with the updated user data
      res.status(200).send({
        success: true,
        msg: "Password reset successfully",
        data: userdata,
      });
    } else {
      // Sending a success response if the link has expired or the token is invalid
      res.status(200).send({ success: true, msg: "Link Expired or Invalid Token!" });
    }
  } catch (error) {
    // Handling errors and sending an error response if an exception occurs
    res.status(400).send({ success: false, msg: error.message });
  }
};

const isTokenExpired = (timestamp) => {
  const expirationTime = 86400000; 
  const currentTime = new Date().getTime();
  return (currentTime - timestamp) > expirationTime;
};

/**
 * Edits profile details of the logged-in user.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const editProfile = async (req, res) => {
  try {
    const { email } = req.user; // Extract email from authenticated user
    const updatedUserData = req.body; // Updated user data from request body

    // Find the user by email and update the profile fields
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user profile fields based on the request body
    if (updatedUserData.name) user.name = updatedUserData.name;
    if (updatedUserData.email) user.email = updatedUserData.email;
    if (updatedUserData.height) user.height = updatedUserData.height;
    if (updatedUserData.waist) user.waist = updatedUserData.waist;
    if (updatedUserData.hips) user.hips = updatedUserData.hips;
    if (updatedUserData.neck) user.neck = updatedUserData.neck;

    // Save the updated user profile
    await user.save();

    res.status(204).json({ message: 'Profile Updated Successfully' });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

const getUserDetails = async (req, res) => {
  try {
    // Extract the user email from the request object
    const { email } = req.user;

    if (!email) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Retrieve user details from the database using the email from the token
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user details as JSON response
    res.status(200).json({
      success: true,
      message: 'User details retrieved successfully',
      user: userDetails
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the controller functions
module.exports = {
  signup,
  login,
  forget_password,
  reset_password,
  editProfile,
  getUserDetails
};
