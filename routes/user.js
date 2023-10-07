// Import express, router, bcrypt, jsonwebtoken, authenticateUser middleware, authorizeRole middleware, and User model
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Importing authenticateUser and authorizeRole middleware.
const authenticateUser = require("../middleware/authenticateUser");
const authorizeRole = require("../middleware/authorizeRole");

// Importing User model
const User = require("../models/Users");

// Register User End Point
router.post("/register", async (req, res) => {
  // Trys to register a new user
  try {
    console.log("Request received:", req.body);
    // Destructuring request body
    const { username, email, password, role } = req.body;

    // Checking if email exists
    console.log("Checking if email exists...");
    // Finds user by email
    const emailExists = await User.findOne({ email });
    // If email exists, send error
    if (emailExists) {
      console.log("Email exists");
      // Return response with status 400 and message
      return res.status(400).json({ message: "Email is already in use" });
    }

    console.log("Checking if username exists...");
    // Finds user by username
    const usernameExists = await User.findOne({ username });
    // If username exists, send error
    if (usernameExists) {
      // Return response with status 400 and message
      console.log("Username exists");
      //
      return res.status(400).json({ message: "Username is already in use" });
    }
    // Below is the code for hashing the password
    const salt = await bcrypt.genSalt(10);
    // variable to store hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    // Saving the new user
    await newUser.save();

    console.log("User created");
    // Return response with status 201 and messages
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
    // If there is an error, it will be caught here
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Log in User End Point
router.post("/login", async (req, res) => {
  // Trys to log in a user
  try {
    // Finds user by username
    const user = await User.findOne({ username: req.body.username });

    // If user is not found, send error
    if (!user) {
      return res.status(400).send({ error: "Invalid credentials." });
    }

    // If user is found, compare passwords
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    // If passwords don't match, send error
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials." });
    }

    // If passwords match, generate token
    const token = jwt.sign(
      // Payload
      { _id: user._id.toString(), role: user.role },
      // Secret
      process.env.JWT_SECRET,
      // Token expires in 12 hours.
      { expiresIn: "12h" }
    );

    // Add token to user's tokens array
    user.tokens = user.tokens.concat({ token });
    // Saves user
    await user.save();

    // Return response with user and token
    res.send({ user, token });
    // If there is an error, it will be caught here
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
});

module.exports = router;
