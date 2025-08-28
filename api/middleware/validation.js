const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            console.log('Validating request body:', req.body);
            await schema.validateAsync(req.body, { abortEarly: false });
            console.log('Validation successful');
            next();
        } catch (error) {
            console.error('Validation error:', error);
            // Collect all validation errors
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: errors
            });
        }
    };
};

module.exports = validateRequest; 