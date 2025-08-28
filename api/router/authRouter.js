const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/UserSchema');
// const { authenticateToken } = require('../middleware/auth');
const authenticateToken = require('../middleware/auth');
const validateRequest = require('../middleware/validation');
const { loginSchema, registerSchema, changePasswordSchema } = require('../validation/authSchemas');

// Register user
router.post('/register', validateRequest(registerSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Registration attempt for:', email);
        console.log(`[REGISTER] Registration attempt for: ${email}`);
        
        // Log MongoDB connection state
        console.log('MongoDB connection state:', mongoose.connection.readyState);
        if (mongoose.connection.readyState !== 1) {
            console.error('MongoDB not connected. Current state:', mongoose.connection.readyState);
            return res.status(500).json({
                status: 'error',
                message: 'Database connection not ready',
                details: 'Please try again in a few moments'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({
                status: 'error',
                message: 'Email is already registered'
            });
        }

        // Create new user
        console.log('Creating new user in database...');
        const user = new User({ email, password });
        
        try {
            await user.save();
            console.log('User saved successfully:', email);
        } catch (dbError) {
            console.error('Database error:', dbError);
            return res.status(500).json({
                status: 'error',
                message: 'Error saving user to database',
                details: dbError.message
            });
        }

        // Generate token
        let token;
        try {
            token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || 'fallback-secret-key',
                { expiresIn: '24h' }
            );
            console.log('Token generated for user:', email);
        } catch (tokenError) {
            console.error('Token generation error:', tokenError);
            return res.status(500).json({
                status: 'error',
                message: 'Error generating authentication token'
            });
        }

        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email
                }
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error during registration',
            details: error.message
        });
    }
});

// Login user
router.post('/login', validateRequest(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for email:', email);

        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        console.log('User found, checking password');
        
        try {
            // Check password using the method from UserSchema
            const isMatch = await user.comparePassword(password);
            console.log('Password match:', isMatch);
            
            if (!isMatch) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid email or password'
                });
            }
        } catch (passwordError) {
            console.error('Password comparison error:', passwordError);
            return res.status(500).json({
                status: 'error',
                message: 'Error verifying password'
            });
        }

        // Generate token
        let token;
        try {
            token = jwt.sign(
                { userId: user._id.toString() }, // Ensure userId is a string
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            console.log('Token generated successfully for:', email);
            console.log('User ID in token:', user._id.toString());
        } catch (tokenError) {
            console.error('Token generation error:', tokenError);
            return res.status(500).json({
                status: 'error',
                message: 'Error generating authentication token'
            });
        }

        res.json({
            status: 'success',
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user._id.toString(),
                    email: user.email
                }
            }
        });
    } catch (error) {
        console.error('Login error details:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error during login',
            details: error.message
        });
    }
});

// Change password
router.post('/change-password', authenticateToken, validateRequest(changePasswordSchema), async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.userId;

        // Get user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Current password is incorrect'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            status: 'success',
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error during password change'
        });
    }
});



// Get current user
router.get('/me', authenticateToken, async (req, res) => {
    try {
        console.log('Fetching user data for ID:', req.user.userId);
        
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            console.log('User not found for ID:', req.user.userId);
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        console.log('User found:', user.email);
        res.json({
            status: 'success',
            data: {
                user: {
                    id: user._id.toString(),
                    email: user.email
                }
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error while fetching user data'
        });
    }
});

module.exports = router; 