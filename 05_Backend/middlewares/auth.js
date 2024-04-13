const jwt = require('jsonwebtoken');
const User = require('../models/user_schema');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }

  try {
    const extractedToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(extractedToken, process.env.SECRET_KEY);

    // Fetch user from database based on decoded user ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token',
      });
    }

    // Attach user object to request for further use in route handlers
    req.user = {
      _id: user._id,
      username: user.username,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid token',
    });
  }
};

module.exports = { verifyToken };
