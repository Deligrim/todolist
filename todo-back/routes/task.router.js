"use strict";

const express = require('express');
const { adminAuth } = require('../middlewares/auth.middleware');
const { getTaskList, createTask, adminEditTask, editTaskText, setDoneTask } = require('../controllers/task.controller');

const router = express.Router();

router.get('/', getTaskList);
router.post('/', createTask);
router.put('/edit-text', adminAuth, editTaskText);
router.put('/done', adminAuth, setDoneTask);

module.exports = router;
