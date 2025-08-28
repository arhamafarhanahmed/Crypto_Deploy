const mongoose = require("mongoose");

// Define the schema for text input
const textSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true, // Content is mandatory
    trim: true, // Removes extra spaces
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

// Create the model
const Text = mongoose.model("Text", textSchema);

module.exports = Text;
