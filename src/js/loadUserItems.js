import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {templateTodoItem, templateChipFirst, templateChipSecond} from "./template.js";
import {
    $activeFilter,
    $allFilter, $completedFilter,
    activeUser,
    createElementByString
} from "./index.js";

const notCreateDeleteButton = (button) => {
    return !(button.classList.contains("user-create-button") ||
        button.classList.contains("user-delete-button"));
}

const updateTodoItemsCount = (count) => {
    const $todoCount = document.querySelector(".todo-count");
    const $strongTag = $todoCount.querySelector('strong');
    $strongTag.innerText = count;
}

export const onLoadUserItemsHandler = async (event) => {
    const button = event.target;

    if (button && notCreateDeleteButton(button)) {
        const buttonId = button.getAttribute("data-id");
        const response = await fetch(uri.allTodoItems(buttonId), form.get());
        const todoItems = await response.json();

        const $todoList = document.querySelector(".todo-list");
        $todoList.innerHTML = '';
        for (const todoItem of todoItems) {
            const $todoItem = createElementByString(
                templateTodoItem(todoItem._id, todoItem.contents)
            );
            applyCompleted(todoItem, $todoItem);
            applyPriority(todoItem, $todoItem);
            $todoList.appendChild($todoItem);
        }

        updateTodoItemsCount(todoItems.length);
        activeUser(buttonId);
    }
}

export const loadNewTodoItems = async (dataId) => {
    const response = await fetch(uri.allTodoItems(dataId), form.get());
    const todoItems = await response.json();

    const $todoList = document.querySelector(".todo-list");
    $todoList.innerHTML = '';
    for (const todoItem of todoItems) {
        const $todoItem = createElementByString(
            templateTodoItem(todoItem._id, todoItem.contents)
        );
        applyCompleted(todoItem, $todoItem);
        applyPriority(todoItem, $todoItem);
        $todoList.appendChild($todoItem);
    }

    updateTodoItemsCount(todoItems.length);
}

function applyCompleted(todoItem, $todoItem) {
    if (todoItem.isCompleted) {
        $todoItem.querySelector("li").classList.add("completed");
        $todoItem.querySelector(".toggle").toggleAttribute("checked");
    }
}

function applyPriority(todoItem, $todoItem) {
    if (todoItem.priority === "FIRST") {
        $todoItem.querySelector(".chip")
            .replaceWith(createElementByString(templateChipFirst));
    }

    if (todoItem.priority === "SECOND") {
        $todoItem.querySelector(".chip")
            .replaceWith(createElementByString(templateChipSecond));
    }
}

export const onAllFilterHandler = () => {
    $allFilter.classList.add("selected");
    $activeFilter.classList.remove("selected");
    $completedFilter.classList.remove("selected");

    const $todoList = document.querySelector(".todo-list");
    for (const todoItem of $todoList.children) {
        todoItem.style.display = "block";
    }

    updateTodoItemsCount($todoList.childElementCount);
}

export const onActiveFilterHandler = () => {
    $allFilter.classList.remove("selected");
    $activeFilter.classList.add("selected");
    $completedFilter.classList.remove("selected");

    let countOfActiveItem = 0;
    const $todoList = document.querySelector(".todo-list");

    for (const todoItem of $todoList.children) {
        if (todoItem.classList.contains("completed")) {
            todoItem.style.display = "none";
        } else {
            todoItem.style.display = "block";
            countOfActiveItem += 1;
        }
    }

    updateTodoItemsCount(countOfActiveItem);
}

export const onCompletedFilterHandler = () => {
    $allFilter.classList.remove("selected");
    $activeFilter.classList.remove("selected");
    $completedFilter.classList.add("selected");

    let countOfCompltedItem = 0;
    const $todoList = document.querySelector(".todo-list");

    for (const todoItem of $todoList.children) {
        if (todoItem.classList.contains("completed")) {
            todoItem.style.display = "block";
            countOfCompltedItem += 1;
        } else {
            todoItem.style.display = "none";
        }
    }

    updateTodoItemsCount(countOfCompltedItem);
}
