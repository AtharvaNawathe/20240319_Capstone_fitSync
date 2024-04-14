const jwt = require('jsonwebtoken');
const User = require('../models/user_schema');

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
      return res.status(401).json({ error: "You are not logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
          return res.status(401).json({ error: "You must be logged out" });
      }
      // If verification is successful, attach user data to the request object
      req.user = payload;
      // Call the next middleware or route handler
      next();
  });
};



module.exports = { verifyToken };
