const Joi = require('joi');

// Common email and password rules
const email = Joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    });

const password = Joi.string()
    .min(6)
    .required()
    .messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    });

// Login schema
const loginSchema = Joi.object({
    email,
    password
});

// Registration schema
const registerSchema = Joi.object({
    email,
    password
});

// Change password schema
const changePasswordSchema = Joi.object({
    currentPassword: password,
    newPassword: password,
    confirmPassword: Joi.string()
        .required()
        .messages({
            'any.required': 'Please confirm your password'
        })
});

module.exports = {
    loginSchema,
    registerSchema,
    changePasswordSchema
}; 