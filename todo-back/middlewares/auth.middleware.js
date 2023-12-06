"use strict";

const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const bearerPrefix = "Bearer ";

    if (!authHeader || !authHeader.startsWith(bearerPrefix)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.substring(bearerPrefix.length, authHeader.length);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decoded.username;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { adminAuth };