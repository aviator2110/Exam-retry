import { Task } from "./Task.js";

export class TaskManager {
    #allTasks = [];
    #tasksListElement = document.getElementById("tasks-list");
    #modal = document.getElementById("task-modal");

    #currentFilter = "all";
    #currentSort = "date";

    constructor(mustRender = true) {
        this.#allTasks = this.#loadTasks();
        if (mustRender) {
            this.#renderTasks();
        }
    }

    get allTasks() {
        return this.#allTasks;
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

            Task.lastId = maxId + 1;
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

    get saveTasks(){
        return this.#saveTasks();
    }

    #renderTasks() {
        this.#tasksListElement.innerHTML = "";

        let filtered = this.#allTasks.filter(task => {
            if (this.#currentFilter === "completed") {
                return task.isComplete;
            }
            if (this.#currentFilter === "not-completed") {
                return !task.isComplete;
            }

            return true;
        });

        if (this.#currentSort === "date") {
            filtered.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        }
        if (this.#currentSort === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        filtered.forEach(task => {

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
            deleteBtn.id = "delete-button";
            deleteBtn.addEventListener("click", (e) => {
                this.#allTasks = this.#allTasks.filter(t => t.id !== task.id);
                this.#saveTasks();
                this.#renderTasks();
                e.stopPropagation();
            });

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.id = "edit-button";
            editBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.location.href = `edit/edit.html?id=${task.id}`;
            })

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(editBtn);
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
            <p><strong>Id:</strong> ${task.id}</p>
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

    setFilter(filter) {
        this.#currentFilter = filter;
        this.#renderTasks();
    }

    setSort(sort) {
        this.#currentSort = sort;
        this.#renderTasks();
    }
}