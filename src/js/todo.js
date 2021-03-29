import {execute, renderTodoList} from './store/todoListStoreAccessor.js';
import {currentUserId} from "./user.js";

const $todoInput = document.querySelector(".new-todo");
const $toggleParentList = document.querySelector(".todo-list");
const $filterList = document.querySelector(".filters");

const EMPTY_STRING = "";

$todoInput.addEventListener("keyup", onAddTodoItem);

$toggleParentList.addEventListener("keyup", onEditTodoItem)
$toggleParentList.addEventListener("click", onClickTodoItem);
$toggleParentList.addEventListener("dblclick", onEditModeTodoItem);

$filterList.addEventListener("click", onClickFilter);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if (event.key === "Enter" && todoTitle !== "") {
        execute("add", {id: currentUserId(), title: todoTitle}, getState());
        event.target.value = EMPTY_STRING;
    }
}

function onClickTodoItem(event) {
    onToggleTodoItem(event);
    onRemoveTodoItem(event);
}

function onRemoveTodoItem(event) {
    if (event.target && event.target.className === "destroy") {
        execute("delete", {id: getOnEventClosestTodoItemId(event)}, getState(), currentUserId);
    }
}

function onEditModeTodoItem(event) {
    event.target.closest(".todo-item").classList.add("editing");
}

function onEditTodoItem(event) {
    if (event.target && event.target.className === "edit") {
        const todoTitle = event.target.value;

        if (event.key === "Enter" && todoTitle !== "") {
            execute("update", {id: getOnEventClosestTodoItemId(event), title: todoTitle}, getState(), currentUserId);
        } else if (event.key === "Escape") {
            renderTodoList(getState());
        }
    }
}

function getOnEventClosestTodoItemId(event) {
    return event.target.closest(".todo-item").id;
}

function onToggleTodoItem(event) {
    if (event.target && event.target.className === "toggle") {
        execute("toggle", {id: getOnEventClosestTodoItemId(event)}, getState(), currentUserId);
    }
}

function onClickFilter(event) {
    if (event.target.classList.contains("filter-item")) {
        const $filterItems = event.target.closest(".filters").querySelectorAll("li>a");
        $filterItems.forEach(item => item.classList.remove("selected"));
        event.target.classList.add("selected");
        renderTodoList(getState(), currentUserId);
    }
}

function getState() {
    let state = "";
    $filterList.querySelector(".selected").classList
        .forEach(className => {
            if (className !== "filter-item" && className !== "selected") {
                state = className;
            }
        });
    return state;
}