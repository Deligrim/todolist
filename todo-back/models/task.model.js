"use strict";

const { DataTypes, Model } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isDone: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        edited: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks',
        createdAt: true,
        updatedAt: false
      }
    );
  }

  static async getTaskById(id) {
    return this.findByPk(id);
  }

  static async getTaskList({ page, sortField, sortOrder }) {
    const limit = process.env.TASKS_PER_PAGE;
    const offset = (page - 1) * limit;

    const tasks = await this.findAndCountAll({
      limit,
      offset,
      order: [[sortField, sortOrder]],
    });

    return {
      totalTasks: tasks.count,
      totalPages: Math.ceil(tasks.count / limit),
      currentPage: +page,
      tasks: tasks.rows,
    };
  }

  static async createNewTask({ username, email, text }) {
    return this.create({
      username,
      email,
      text,
    });
  }

  async editTask(payload) {
    if(payload.text?.length && payload.text != this.text){
        this.text = payload.text;
        this.edited = true;
    }
    if('isDone' in payload){
      this.isDone = payload.isDone;
    }
    await this.save();

    return this;
  }
}

module.exports = Task;
