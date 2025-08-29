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

// Allowed origins with better flexibility
const allowedOrigins = [
  "https://ddefistakedwted.vercel.app"
  // "http://localhost:5173",
  // "http://localhost:3000",
  // "http://localhost:8005"
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced CORS with debugging
app.use(
  cors({
    origin: function (origin, callback) {
      // Log all incoming requests for debugging
      console.log(`🔍 CORS Check - Origin: ${origin || 'No Origin'}`);
      
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) {
        console.log("✅ Allowing request with no origin");
        return callback(null, true);
      }
      
      // Check exact match first
      if (allowedOrigins.includes(origin)) {
        console.log(`✅ Origin allowed: ${origin}`);
        return callback(null, true);
      }
      
      // Allow all Vercel deployments (including preview URLs)
      if (origin.includes('.vercel.app')) {
        console.log(`✅ Allowing Vercel deployment: ${origin}`);
        return callback(null, true);
      }
      
      // Reject all others
      console.log(`❌ CORS BLOCKED: ${origin}`);
      console.log(`📋 Allowed origins:`, allowedOrigins);
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type", 
      "Authorization", 
      "X-Requested-With",
      "Accept",
      "Origin"
    ],
    exposedHeaders: ["Content-Length"],
    maxAge: 86400 // 24 hours preflight cache
  })
);

// Explicit OPTIONS handler for preflight requests
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  console.log(`🔄 Preflight OPTIONS request from: ${origin || 'No Origin'}`);
  
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

// Security middleware
app.use(helmet({ 
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(securityHeaders);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// CORS test route
app.get("/api/cors-test", (req, res) => {
  res.json({ 
    message: "CORS test successful",
    origin: req.headers.origin || 'No Origin',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api", textRouter);

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error("🚨 Server Error:", err.message);
  console.error("Stack:", err.stack);
  
  if (err.message.includes('CORS')) {
    return res.status(403).json({ 
      error: "CORS Error", 
      message: err.message,
      origin: req.headers.origin
    });
  }
  
  errorHandler(err, req, res, next);
});

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    status: "error", 
    message: "Route not found",
    path: req.path,
    method: req.method
  });
});

// Start server
const port = process.env.PORT || 8005;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📋 Allowed origins:`, allowedOrigins);
  console.log(`🔗 Health check: http://localhost:${port}/api/health`);
  console.log(`🔗 CORS test: http://localhost:${port}/api/cors-test`);
});