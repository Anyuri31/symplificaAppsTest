const { getAllTasks, createTask, deleteTask } = require("../../taskService");
const { Task } = require("../../../sequelize/models");

jest.mock("../../../sequelize/models"); // mockeamos Sequelize para no tocar la DB real

describe("Task Service - pruebas unitarias", () => {
    beforeEach(() => {
    jest.clearAllMocks(); // limpia mocks antes de cada test
    });

    test("GET all tasks - devuelve lista de tareas", async () => {
    Task.findAll.mockResolvedValue([{ id: 1, title: "Tarea 1" }]);
    const tasks = await getAllTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Tarea 1");
    });

    test("CREATE task - crea tarea correctamente", async () => {
    const newTask = { id: 2, title: "Nueva tarea" };
    Task.create.mockResolvedValue(newTask);
    const result = await createTask({ title: "Nueva tarea" });
    expect(result).toEqual(newTask);
    });

    test("DELETE task - elimina tarea correctamente", async () => {
    Task.destroy.mockResolvedValue(1); // devuelve 1 fila eliminada
    const result = await deleteTask(1);
    expect(result).toBe(1);
    });
});
