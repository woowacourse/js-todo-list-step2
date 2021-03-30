import * as service from '../../service.js';

export const addEvent = () => {
    const $todoList = document.querySelector(".todo-list");
    $todoList.addEventListener("click", clickTodoItem);
    $todoList.addEventListener("dblclick", dblclickTodoItem);
}

const clickTodoItem = async (event) => {
    if (event.target && event.target.nodeName === "INPUT") {
        toggleTodoItemToBeCompleted(event);
        return;
    }
    if (event.target && event.target.classList.contains("destroy")) {
        deleteTodoItem(event);
    }
}

const toggleTodoItemToBeCompleted = async (event) => {
    const $todoItem = event.target.closest("li");
    $todoItem.classList.toggle("completed");

    const $activeUser = document.querySelector('.active');
    const userId = $activeUser.dataset.id;
    await service.toggleTodoItemToBeCompleted(userId, $todoItem.dataset.id);
}

const deleteTodoItem = async (event) => {
    const $todoItem = event.target.closest("li");
    const $activeUser = document.querySelector('.active');
    const userId = $activeUser.dataset.id;
    $todoItem.remove();
    service.deleteTodoItem(userId, $todoItem.dataset.id)
}

const dblclickTodoItem = (event) => {
    if (event.target && event.target.nodeName === "LABEL") {
        convertToEditStatus(event);
    }
}

const convertToEditStatus = (event) => {
    const $todoItem = event.target.closest("li");
    $todoItem.classList.toggle("editing");
    const $input = $todoItem.querySelector(".edit");
    $input.value = getTextFromTodoItem($todoItem);
}

const getTextFromTodoItem = ($todoItem) => {
    const cloneLabel = $todoItem.querySelector(".label").cloneNode(true);
    const selectOption = cloneLabel.querySelector("select");
    const chip = cloneLabel.querySelector(".chip");
    if (selectOption) {
        selectOption.remove();
    }
    if (chip) {
        chip.remove();
    }
    return cloneLabel.textContent.trim();
}