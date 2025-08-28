

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
       
        
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({
                status: 'error',
                message: 'Server configuration error: JWT_SECRET missing'
            });
        }

        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Access token required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return res.status(403).json({
            status: 'error',
            message: 'Invalid or expired token'
        });
    }
};

module.exports = authenticateToken;


