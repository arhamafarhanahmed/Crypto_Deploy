const express = require("express");
const router = express.Router();
const Text = require("../model/TextSchema");
const app = express();

// ✅ Submit New Text
router.post("/submit-text", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content cannot be empty" });
    }

    const newText = new Text({ content });
    const savedText = await newText.save();

    res.status(201).json({ message: "Text saved successfully", savedText });
  } catch (error) {
    console.error("Error saving text:", error);
    res.status(500).json({ error: "Failed to save text" });
  }
});

// ✅ Get All Texts
router.get("/get-texts", async (req, res) => {
  try {
    console.log("Attempting to fetch texts from database...");
    const texts = await Text.find();
    console.log(`Successfully retrieved ${texts.length} texts`);
    res.status(200).json({ texts });
  } catch (error) {
    console.error("Error retrieving texts:", error.message, error.stack);
    res.status(500).json({ error: "Failed to retrieve texts", details: error.message });
  }
});

// ✅ DELETE Text by ID
router.delete(`/delete-text/:id`, async (req, res) => {
  try {
    const id = req.params.id.trim();
    
    
    const deletedText = await Text.findByIdAndDelete(id);

    if (!deletedText) {
      return res.status(404).json({ error: "Text not found" });
    }

    res.status(200).json({ message: "Text deleted successfully", deletedText });
  } catch (error) {
    console.error("Error deleting text:", error);
    res.status(500).json({ error: "Failed to delete text" });
  }
});

module.exports = router;
