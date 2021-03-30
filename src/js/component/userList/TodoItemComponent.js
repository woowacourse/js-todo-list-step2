import * as service from '../../service.js';

export const addEvent = () => {
    const $todoList = document.querySelector(".todo-list");
    $todoList.addEventListener("click", clickTodoItem);
    $todoList.addEventListener("dblclick", dblclickTodoItem);
    $todoList.addEventListener("keydown", keydownTodoItem);
}

const clickTodoItem = async (event) => {
    if (event.target && event.target.nodeName === "INPUT" && event.target.classList.contains("toggle")) {
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
    const $editInput = $todoItem.querySelector(".edit");
    $editInput.value = getTextFromTodoItem($todoItem);
}

const getTextFromTodoItem = ($todoItem) => {
    const text = $todoItem.querySelector(".todo-item-text").textContent;
    return text;
}

const keydownTodoItem = (event) => {
    if (event.key === "Enter") {
        const $todoItem = event.target.closest("li");
        editTodoItem($todoItem);
    }
}

const editTodoItem = ($todoItem) => {
    $todoItem.classList.toggle("editing");
    const $editInput = $todoItem.querySelector(".edit");
    const editedText = $editInput.value;
    $todoItem.querySelector(".todo-item-text").textContent = editedText;

    const $activeUser = document.querySelector('.active');
    const userId = $activeUser.dataset.id;
    service.updateTodoItem(userId, $todoItem.dataset.id, editedText);
}