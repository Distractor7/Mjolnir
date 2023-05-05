// Importing express, mongoose, body-parser, cors, models and middleware.
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// The event and User models are imported here.
const Event = require("../backEnd/models/Event");
const User = require("../backEnd/models/Users");

// The authenticateUser and authorizeRole middleware are imported here.
const authenticateUser = require("../backEnd/middleware/authenticateUser");
const authorizeRole = require("../backEnd/middleware/authorizeRole");

// Added JSON body-parser middleware.
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Imported event routes for the event endpoints.
const eventRoutes = require("./routes/event"); // Imported event routes

// Imported authentication routes for the authentication endpoints.
const authRoutes = require("./routes/user"); // Imported authentication routes

// Registered event routes and authentication routes with the express app.
app.use("/event", eventRoutes); // Registered event routes with the '/event' base path

// Registered authentication routes with the express app.
app.use("/user", authRoutes); // Registered authentication routes with the '/auth' base path

// Connects to MongoDB Atlas
mongoose
  // Below is the connection string to connect to the MongoDB Atlas database.
  .connect(
    "mongodb+srv://Distractor7:camelCase@cluster0.a0pn6wx.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  // If the connection is successful, it will log a message to the console.
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  // If the connection is unsuccessful, it will log an error message to the console.
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas:", error.message);
  });

// Start the server and its listening on port 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
