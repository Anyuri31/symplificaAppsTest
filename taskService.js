const { Task } = require("./test-api/sequelize/models");

async function getAllTasks() {
    return await Task.findAll();
}

async function createTask(data) {
    return await Task.create(data);
}

async function deleteTask(id) {
    return await Task.destroy({ where: { id } });
}

module.exports = { getAllTasks, createTask, deleteTask };
