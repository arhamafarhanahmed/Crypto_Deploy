const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Rate limiting configuration
const loginLimiter = (req, res, next) => next(); // Removed login rate limit

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

// Security headers middleware
const securityHeaders = (req, res, next) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'https://ddefistakedwted.vercel.app/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Removing overly restrictive CSP for development
  // res.setHeader('Content-Security-Policy', "default-src 'self'");

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
};

// Request validation middleware
const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      if (schema.body) {
        const { error } = schema.body.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 'error',
            message: error.details[0].message
          });
        }
      }

      if (schema.query) {
        const { error } = schema.query.validate(req.query);
        if (error) {
          return res.status(400).json({
            status: 'error',
            message: error.details[0].message
          });
        }
      }

      if (schema.params) {
        const { error } = schema.params.validate(req.params);
        if (error) {
          return res.status(400).json({
            status: 'error',
            message: error.details[0].message
          });
        }
      }

      next();
    } catch (error) {
      console.error('Validation Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error during validation'
      });
    }
  };
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};

module.exports = {
  loginLimiter,
  apiLimiter,
  securityHeaders,
  validateRequest,
  errorHandler
}; 