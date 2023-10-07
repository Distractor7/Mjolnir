// Requiring User model
const User = require("../models/Users");
// Requiring jsonwebtoken
const jwt = require("jsonwebtoken");

// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
  // Getting token from header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token from header:", token);

  // Checking if token exists
  if (!token) {
    // If token doesn't exist, send error
    return res.status(401).send({ error: "Please authenticate." });
  }

  // If token exists, verify it
  try {
    // Verifies token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Finds user with token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    console.log("User from database:", user);

    // If user doesn't exist, throw error
    if (!user) {
      throw new Error();
    }

    // If user exists, set req.token and req.user
    req.token = token;
    //
    req.user = user;
    // Call next middleware
    next();
    // If error is caught, send error
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
    console.error("Error caught:", error);
  }
};

// Exporting authenticateUser middleware.
module.exports = authenticateUser;
