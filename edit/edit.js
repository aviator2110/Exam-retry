import {Task} from "../Task.js";
import {TaskManager} from "../TaskManager.js";

const manager = new TaskManager(false);

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const tasks = manager.allTasks;
const task = tasks.find(t => t.id === id);

if (!task) {
    window.location.href = "../not-found.html";
}else {
    document.getElementById("name").value = task.name;
    document.getElementById("description").value = task.description;

    document.getElementById("save").addEventListener("click", (e) => {
        e.preventDefault();

        task.name = document.getElementById("name").value;
        task.description = document.getElementById("description").value;

        manager.saveTasks;

        window.location.href = "../index.html";
    });
}