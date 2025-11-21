import { Task } from "./Task.js";

export class TaskManager {
    #allTasks = [];
    #tasksListElement = document.getElementById("tasks-list");

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
        console.log("raw", raw.length)

        const tasks = raw.map(obj =>
            new Task(obj.name, obj.description, obj.id, obj.creationDate, obj.isComplete)
        );
        console.log("tasks", tasks.length);

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
        console.log(Task.lastId);

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

            checkbox.addEventListener("change", () => {
                task.isComplete = checkbox.checked;
                this.#saveTasks();
            });

            const label = document.createElement("span");
            label.textContent = task.name;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                this.#allTasks = this.#allTasks.filter(t => t.id !== task.id);
                this.#saveTasks();
                this.#renderTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteBtn);

            this.#tasksListElement.appendChild(li);
        });
    }
}