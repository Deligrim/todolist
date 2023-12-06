"use strict";
const Task = require('../models/task.model');
var validator = require('validator');



const getTaskList = async (req, res) => {
    const { page = '1', sortField = 'createdAt', sortOrder = 'DESC' } = req.query;

    const allowedSortFields = ['username', 'email', 'isDone', 'createdAt'];
    const allowedSortOrders = ['ASC', 'DESC'];

    if (!allowedSortFields.includes(sortField))
        return res.status(400).json({ error: 'Invalid value of sortField param' });
    if (!allowedSortOrders.includes(sortOrder.toUpperCase()))
        return res.status(400).json({ error: 'Invalid value of sortOrder param' });
    if (!validator.isNumeric(page))
        return res.status(400).json({ error: 'Inavlid format of page param' });

    const tasks = await Task.getTaskList({ page, sortField, sortOrder });
    res.json(tasks);
};


const createTask = async (req, res) => {
    const { username, email, text } = req.body;

    if (!username?.length || !email?.length || !text?.length)
        return res.status(400).json({ error: 'Username, email and text are required non-empty fileds' });
    if (!validator.isEmail(email))
        return res.status(400).json({ error: 'Invalid email format' });

    const newTask = await Task.createNewTask({ username, email, text });
    res.json({ newTask });
};

const editTaskText = async (req, res) => {
    const { id, text } = req.body;

    if (!id || !text)
        return res.status(400).json({ error: 'id and text are required fileds' });

    const task = await Task.getTaskById(id);
    if (!task)
        return res.status(404).json({ error: 'Task not found' });

    const editedTask = await task.editTask({ text });
    res.json({ editedTask });
};

const setDoneTask = async (req, res) => {
    const { id } = req.body;
    if (!id)
        return res.status(400).json({ error: 'id required filed' });

    const task = await Task.getTaskById(id);

    if (!task)
        return res.status(404).json({ error: 'Task not found' });

    const editedTask = await task.editTask({ isDone: true });
    res.json({ editedTask });
};

module.exports = { getTaskList, createTask, setDoneTask, editTaskText };