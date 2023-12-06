"use strict";
const Task = require('../models/task.model');
var validator = require('validator');



const getTaskList = async (req, res) => {
    const { page = '1', sortField = 'createdAt', sortOrder = 'DESC' } = req.query;

    const allowedSortFields = ['username', 'email', 'isDone', 'createdAt'];
    const allowedSortOrders = ['ASC', 'DESC'];

    if (!allowedSortFields.includes(sortField))
        return res.status(400).json({ error: 'Недопустимое значение параметра sortField' });
    if (!allowedSortOrders.includes(sortOrder.toUpperCase()))
        return res.status(400).json({ error: 'Недопустимое значение параметра sortOrder' });
    if (!validator.isNumeric(page))
        return res.status(400).json({ error: 'Неверный формат параметра page' });

    const tasks = await Task.getTaskList({ page, sortField, sortOrder });
    res.json(tasks);
};


const createTask = async (req, res) => {
    const { username, email, text } = req.body;

    if (!username?.length || !email?.length || !text?.length)
        return res.status(400).json({ error: 'Имя пользователя, email и текст должны быть заполнены' });
    if (!validator.isEmail(email))
        return res.status(400).json({ error: 'Неверный формат email' });

    const newTask = await Task.createNewTask({ username, email, text });
    res.json({ newTask });
};

const editTaskText = async (req, res) => {
    const { id, text } = req.body;

    if (!id || !text)
        return res.status(400).json({ error: 'Требуются поля id и text' });

    const task = await Task.getTaskById(id);
    if (!task)
        return res.status(404).json({ error: 'Задача не найдена' });

    const editedTask = await task.editTask({ text });
    res.json({ editedTask });
};

const setDoneTask = async (req, res) => {
    const { id } = req.body;
    if (!id)
        return res.status(400).json({ error: 'Требуется поле id' });

    const task = await Task.getTaskById(id);

    if (!task)
        return res.status(404).json({ error: 'Задача не найдена' });

    const editedTask = await task.editTask({ isDone: true });
    res.json({ editedTask });
};

module.exports = { getTaskList, createTask, setDoneTask, editTaskText };