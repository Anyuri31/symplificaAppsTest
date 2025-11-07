const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize, Task } = require("./sequelize/models");
const { getAllTasks, createTask, deleteTask } = require("./taskService"); // importamos service
const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

// ⚠️ Bug: no maneja errores globales
app.get("/", async (req, res) => {
  res.json({ message: "API funcionando" });
});

// ⚠️ Bug: no maneja timeouts ni validaciones
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// ⚠️ Bug: no valida campos vacíos
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await createTask({ title, description, completed });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creando tarea" });
  }
});

// ⚠️ Bug: no valida existencia antes de eliminar
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando tarea" });
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database error:", error);
  });
