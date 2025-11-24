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

    const nameRegex = /^(?![0-9 ]+$)(?:[A-Za-z]{1,16}|[А-Яа-яЁё]{1,16}|[0-9]{1,16})(?: (?:[A-Za-z]{1,16}|[А-Яа-яЁё]{1,16}|[0-9]{1,16}))+$/;
    const descriptionRegex = /^(?:[A-Za-z]{1,16}|[А-Яа-яЁё]{1,16}|[0-9]{1,16})(?: (?:[A-Za-z]{1,16}|[А-Яа-яЁё]{1,16}|[0-9]{1,16}))*$/;

    const nameErrorMsg = document.getElementById("name-error-message");
    const descErrorMsg = document.getElementById("description-error-message");
    const sameErrorMsg = document.getElementById("inputs-are-same-error");

    nameErrorMsg.style.display = "none";
    descErrorMsg.style.display = "none";
    sameErrorMsg.style.display = "none";

    if (!nameRegex.test(name)){
        nameErrorMsg.style.display = "flex";
        return;
    }

    if (!descriptionRegex.test(description)){
        descErrorMsg.style.display = "flex";
        return;
    }

    if (name === description){
        sameErrorMsg.style.display = "flex";
        return;
    }

    manager.addTask(name, description);

    addTaskForm.reset();
})

const sortSelect = document.getElementById("sort-select");

sortSelect.addEventListener("change", () => {
    manager.setSort(sortSelect.value);
});

const filterSelect = document.getElementById("filter-select");

filterSelect.addEventListener("change", () => {
    manager.setFilter(filterSelect.value);
});