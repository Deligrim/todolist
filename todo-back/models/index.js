"use strict";

const { Sequelize } = require("sequelize");

const configure = async () => {
  const sequelize = new Sequelize(
    process.env.DBMS_DATABASE,
    process.env.DBMS_USERNAME,
    process.env.DBMS_PASSWORD,
    {
      host: process.env.DBMS_HOST,
      pool: process.env.DBMS_PORT,
      dialect: 'postgres',
      logging: console.log
    }
  );

  const definedModels = [require("./task.model")];
  definedModels.forEach(m => m.init(sequelize));

  await sequelize.sync();
  return sequelize;
}

module.exports = { configure };