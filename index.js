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