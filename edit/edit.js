import {Task} from "../Task.js";
import {TaskManager} from "../TaskManager.js";

const manager = new TaskManager(false);

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

console.log("Editing task with id:", id);

const tasks = manager.allTasks;
const task = tasks.find(t => t.id === id);

if (!task) {
    alert("Task not found");
}

document.getElementById("name").value = task.name;
document.getElementById("description").value = task.description;

document.getElementById("save").addEventListener("click", () => {
    task.name = document.getElementById("name").value;
    task.description = document.getElementById("description").value;

    manager.saveTasks;

    window.location.href = "../index.html";
});