"use strict";

const express = require('express');
const taskRouter = require('./task.router');
const adminRouter = require('./admin.router');

const router = express.Router();

router.use('/tasks', taskRouter);
router.use('/admin', adminRouter);
router.use((err, req, res, next) => res.status(500).json({ error: 'Internal Server Error' }));
router.use((req, res) => {res.status(404).json({ error: "Route not found" }); });
module.exports = router;
