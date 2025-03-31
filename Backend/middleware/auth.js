const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure you have JWT_SECRET in .env

// Middleware to verify if the user is authenticated
const isUserAuthenticated = (req, res, next) => {
    console.log(req.headers);
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Store user info in req object
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};

// Middleware to verify if the user is an admin
const isAdminAuthenticated = (req, res, next) => {
    isUserAuthenticated(req, res, () => {
        if (req.user && req.user.role === "admin") {
            next(); // Allow access
        } else {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
    });
};

module.exports = { isUserAuthenticated, isAdminAuthenticated };
