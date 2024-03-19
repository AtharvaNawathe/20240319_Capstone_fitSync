// Import required modules
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

// Create an Express application
const app = express();
dotenv.config();
app.use(bodyParser.json());
//connecting to the datbase:

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect
  }
};

// Define routes
app.use("/user",userRoutes);

// Start the server
const startServer = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};


connectToMongoDB().then(startServer);