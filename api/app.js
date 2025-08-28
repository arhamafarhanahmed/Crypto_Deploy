require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./router/authRouter");
const textRouter = require("./router/router");
const { securityHeaders, errorHandler } = require("./middleware/security");
const connectDB = require("./database/connection"); // connection.js import

const app = express();

// Connect to MongoDB
console.log("Attempting to connect to MongoDB Atlas...");
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://crypto-deploy-nine.vercel.app", // tumhara frontend domain
      "http://localhost:5173",                 // local testing
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(securityHeaders);

// Routes
app.use("/api/auth", authRouter);
app.use("/api", textRouter);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// ✅ Always listen (both local + production)
const port = process.env.PORT || 8005;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
