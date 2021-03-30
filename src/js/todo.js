import {execute, renderTodoList} from './store/todoListStoreAccessor.js';
import {currentUserId} from "./user.js";

const $todoInput = document.querySelector(".new-todo");
const $toggleParentList = document.querySelector(".todo-list");
const $filterList = document.querySelector(".filters");
const $clearButton = document.querySelector(".clear-completed");

const EMPTY_STRING = "";

$todoInput.addEventListener("keyup", onAddTodoItem);

$toggleParentList.addEventListener("keyup", onEditTodoItem)
$toggleParentList.addEventListener("click", onClickTodoItem);
$toggleParentList.addEventListener("dblclick", onEditModeTodoItem);
$clearButton.addEventListener('click', onRemoveTodoItemAll);

$filterList.addEventListener("click", onClickFilter);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if (event.key === "Enter" && todoTitle !== "") {
        execute("add", {userId: currentUserId(), contents: todoTitle}, getState());
        event.target.value = EMPTY_STRING;
    }
}

function onClickTodoItem(event) {
    onToggleTodoItem(event);
    onRemoveTodoItem(event);
}

function onRemoveTodoItemAll(){
    execute("deleteAll", {userId: currentUserId()})
}
function onRemoveTodoItem(event) {
    if (event.target && event.target.className === "destroy") {
        execute("delete", {
            userId: currentUserId(),
            todoId: getOnEventClosestTodoItemId(event)
        }, getState());
    }
}

function onEditModeTodoItem(event) {
    event.target.closest(".todo-item").classList.add("editing");
}

function onEditTodoItem(event) {
    if (event.target && event.target.className === "edit") {
        const todoTitle = event.target.value;

        if (event.key === "Enter" && todoTitle !== "") {
            execute("update", {userId: currentUserId(), todoId: getOnEventClosestTodoItemId(event), contents: todoTitle}, getState());
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
        execute("toggle", {todoId: getOnEventClosestTodoItemId(event), userId: currentUserId()}, getState());
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