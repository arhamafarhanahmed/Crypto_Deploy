require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./router/authRouter");
const textRouter = require("./router/router");
const { securityHeaders, errorHandler } = require("./middleware/security");
const connectDB = require("./database/connection");

const app = express();

// Connect to MongoDB
console.log("Attempting to connect to MongoDB Atlas...");
connectDB();

// Allowed origins
const allowedOrigins = [
  "https://crypto-deploy-nine.vercel.app", // Vercel frontend
  "http://localhost:5173"                  // Local testing
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight
app.options("*", cors());

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

// ✅ Always listen (Render requires this)
const port = process.env.PORT || 8005;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${port}`);
});
