import { Task } from "./Task.js";

export class TaskManager {
    #allTasks = [];
    #tasksListElement = document.getElementById("tasks-list");
    #modal = document.getElementById("task-modal");

    constructor() {
        this.#allTasks = this.#loadTasks();
        this.#renderTasks();
    }

    addTask(name, description) {
        const task = new Task(name, description);
        this.#allTasks.push(task);

        this.#saveTasks()
        this.#renderTasks()
    }

    #loadTasks(){
        const raw = JSON.parse(localStorage.getItem("tasks")) || [];

        const tasks = raw.map(obj =>
            new Task(obj.name, obj.description, obj.id, obj.creationDate, obj.isComplete)
        );

        if (tasks.length > 0) {
            let maxId = tasks[0].id;

            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id > maxId) {
                    maxId = tasks[i].id;
                }
            }

            Task.lastId = maxId;
        } else {
            Task.lastId = 0;
        }

        return tasks;
    }

    #saveTasks(){
        let jsonTasks = [];

        for (let i = 0; i < this.#allTasks.length; i++) {
            jsonTasks.push(this.#allTasks[i].toJSON());
        }

        const json = JSON.stringify(jsonTasks);
        localStorage.setItem("tasks", json);
    }

    #renderTasks() {
        this.#tasksListElement.innerHTML = ""; // очищаем список

        this.#allTasks.forEach(task => {
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.isComplete;

            checkbox.addEventListener("change", (e) => {
                task.isComplete = checkbox.checked;
                this.#saveTasks();
            });

            checkbox.addEventListener("click", (e) => {
                e.stopPropagation();
            });

            const label = document.createElement("span");
            label.textContent = task.name;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", (e) => {
                this.#allTasks = this.#allTasks.filter(t => t.id !== task.id);
                this.#saveTasks();
                this.#renderTasks();
                e.stopPropagation();
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteBtn);

            li.addEventListener("click", () => {
                this.#showTaskDetails(task);
            });

            this.#tasksListElement.appendChild(li);
        });
    }

    #showTaskDetails(task) {
        let completeStatus;
        if (task.isComplete) {
            completeStatus = "Complete";
        } else{
            completeStatus = "Not completed";
        }

        this.#modal.innerHTML = `
            <h3>${task.name}</h3>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Created at:</strong> ${task.creationDate}</p>
            <p><strong>Complete status:</strong> ${completeStatus}</p>
            <button id="close-modal">Close</button>`;

        this.#modal.style.display = "flex";
        this.#modal.style.flexDirection = "column";

        document.getElementById("close-modal").addEventListener("click", () => {
            this.#modal.style.display = "none";
        });
    }
}