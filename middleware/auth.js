const config = require('config');
const jwt = require('jsonwebtoken');

// Middleware function
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
        res.status(401).json({msg: 'Unauthorized'});
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({msg: "Invalid token"});
    }
}

module.exports = auth;