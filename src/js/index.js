import {execute, renderTodoList} from './store/todoListStoreAccessor.js';
import {addUser, getUsers} from "./store/userController.js";

const $todoInput = document.querySelector(".new-todo");
const $toggleParentList = document.querySelector(".todo-list");
const $filterList = document.querySelector(".filters");
const $userCreateButton = document.querySelector('.user-create-button')

const EMPTY_STRING = "";

$todoInput.addEventListener("keyup", onAddTodoItem);

$toggleParentList.addEventListener("keyup", onEditTodoItem)
$toggleParentList.addEventListener("click", onClickTodoItem);
$toggleParentList.addEventListener("dblclick", onEditModeTodoItem);

$filterList.addEventListener("click", onClickFilter);
$userCreateButton.addEventListener('click', onUserCreateHandler)

getUsers();

function onUserCreateHandler() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if (event.key === "Enter" && todoTitle !== "") {
        execute("add", {id: Date.now(), title: todoTitle}, getState());
        event.target.value = EMPTY_STRING;
    }
}

function onClickTodoItem(event) {
    onToggleTodoItem(event);
    onRemoveTodoItem(event);
}

function onRemoveTodoItem(event) {
    if (event.target && event.target.className === "destroy") {
        execute("delete", {id: getOnEventClosestTodoItemId(event)}, getState());
    }
}

function onEditModeTodoItem(event) {
    event.target.closest(".todo-item").classList.add("editing");
}

function onEditTodoItem(event) {
    if (event.target && event.target.className === "edit") {
        const todoTitle = event.target.value;

        if (event.key === "Enter" && todoTitle !== "") {
            execute("update", {id: getOnEventClosestTodoItemId(event), title: todoTitle}, getState());
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
        execute("toggle", {id: getOnEventClosestTodoItemId(event)}, getState());
    }
}

function onClickFilter(event) {
    if (event.target.classList.contains("filter-item")) {
        const $filterItems = event.target.closest(".filters").querySelectorAll("li>a");
        $filterItems.forEach(item => item.classList.remove("selected"));
        event.target.classList.add("selected");
        renderTodoList(getState());
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