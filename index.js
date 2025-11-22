import {Task} from "./Task.js";
import {TaskManager} from "./TaskManager.js";

const hideFormButton = document.getElementById("hide-form");
const addTaskForm = document.getElementById("add-task-form");

addTaskForm.style.display = "none";

hideFormButton.addEventListener("click", (e) => {
    if(addTaskForm.style.display === "none") {
        addTaskForm.style.display = "flex";
    }
    else {
        addTaskForm.style.display = "none";
    }

    if (hideFormButton.textContent === "Add task"){
        hideFormButton.textContent = "Back";
    }
    else {
        hideFormButton.textContent = "Add task";
    }
})

const manager = new TaskManager();

const addNewTaskBtn = document.getElementById("submit-add-form");

addNewTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const dataForm = new FormData(addTaskForm);
    const name = dataForm.get("name");
    const description = dataForm.get("description");

    manager.addTask(name, description);

    addTaskForm.reset();
})