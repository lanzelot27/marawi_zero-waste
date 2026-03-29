// authMW.js

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get token from the Authorization header
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user ID to the request object
        req.user = { userId: decoded.userId };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;
