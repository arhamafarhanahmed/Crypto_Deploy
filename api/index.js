// api/index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Text = require("./model/TextSchema");
const authRouter = require("./router/authRouter");

// Create express app
const app = express();
app.use(express.json());
app.use(cors());

// Mount auth routes
app.use("/api/auth", authRouter);

// Database connection optimization for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    // Use existing database connection
    return cachedDb;
  }
  
  // No existing connection, create a new one
  try {
    const client = await mongoose.connect(process.env.DATABASE, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      bufferCommands: false,
    });
    
    // Add connection error handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    
    cachedDb = client;
    console.log("New database connection established");
    return client;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

// Define routes
app.get("/api/get-texts", async (req, res) => {
  try {
    console.log("Connecting to database...");
    await connectToDatabase();
    
    console.log("Fetching texts...");
    const texts = await Text.find().lean();
    console.log(`Retrieved ${texts.length} texts`);
    
    return res.status(200).json({ texts });
  } catch (error) {
    console.error("Error in get-texts:", error);
    return res.status(500).json({ 
      error: "Failed to retrieve texts", 
      details: error.message 
    });
  }
});

app.delete("/api/delete-text/:id", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;
    
    const deletedText = await Text.findByIdAndDelete(id);
    if (!deletedText) {
      return res.status(404).json({ error: "Text not found" });
    }
    
    return res.status(200).json({ message: "Text deleted successfully" });
  } catch (error) {
    console.error("Error in delete-text:", error);
    return res.status(500).json({ error: "Failed to delete text" });
  }
});

app.post("/api/submit-text", async (req, res) => {
  try {
    await connectToDatabase();
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content cannot be empty" });
    }

    const newText = new Text({ content });
    const savedText = await newText.save();
    
    return res.status(201).json({ message: "Text saved successfully", savedText });
  } catch (error) {
    console.error("Error in submit-text:", error);
    return res.status(500).json({ error: "Failed to save text" });
  }
});

// Export the Express API
module.exports = app;