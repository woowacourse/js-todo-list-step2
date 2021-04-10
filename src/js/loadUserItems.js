import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {templateTodoItem, templateChipFirst, templateChipSecond} from "./template.js";
import {activeUser, createElementByString} from "./index.js";

function notCreateDeleteButton(button) {
    return !(button.classList.contains("user-create-button") ||
        button.classList.contains("user-delete-button"));
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
