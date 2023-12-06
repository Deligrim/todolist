"use strict";

const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD) {
        const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ accessToken });
    } else {
        res.status(401).json({ error: 'Неверный логин или пароль' });
    }
};

module.exports = { login };