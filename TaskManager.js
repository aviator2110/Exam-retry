import { Task } from "./Task.js";

export class TaskManager {
    #allTasks = [];

    constructor() {
        this.#loadTasks();
    }

    addTask(name, description) {
        const task = new Task(name, description);
        this.#allTasks.push(task);

        this.#saveTasks()
    }

    deleteTask() {

    }

    #loadTasks(){
        const raw = JSON.parse(localStorage.getItem("tasks")) || [];

        const tasks = raw.map(obj =>
            new Task(obj.name, obj.description, obj.id, obj.creationDate, obj.isComplete)
        );

        let maxId = tasks[0].id;

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id > maxId) {
                maxId = tasks[i].id;
            }
        }

        Task.lastId = maxId;

        return tasks;
    }

    #saveTasks(){
        const json = JSON.stringify(this.#allTasks);
        localStorage.setItem("tasks", json);
    }
}