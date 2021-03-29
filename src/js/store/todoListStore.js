export {addTodoItem, updateTodoItem, removeTodoItem, findById, toggleStateTodoItem, getTodoItems, deepCopyStore}
import {addTodoFetch, getTodoFetch, toggleItem} from "../fetch/todoFetch.js";

let todoListStore = [];

const EMPTY_STRING = "";

function deepCopyStore() {
    return JSON.parse(JSON.stringify(todoListStore));
}

function createTodoItem(id, title = EMPTY_STRING, isComplete = false) {
    let state = "active";
    if (isComplete) {
        state = "completed";
    }
    return {id: id, title: title, state: state}
}


function addTodoItem(id, title = EMPTY_STRING) {
    return addTodoFetch(id, title)
        .then(data => todoListStore.push(createTodoItem(data._id, data.contents, data.isComplete)));
}

function getTodoItems(userId) {
    todoListStore = [];
    return getTodoFetch(userId)
        .then(todos =>
            todos.forEach(todo => todoListStore.push(createTodoItem(todo._id, todo.contents, todo.isComplete))));
}

function updateTodoItem(id, insert = EMPTY_STRING) {
    findById(id).title = insert;
}

function findById(id) {
    if (todoListStore.some(item => item.id === id)) {
        return todoListStore.find(item => item.id === id);
    } else {
        throw `${id}라는 ID를 가진 요소가 없습니다!`;
    }
}

function indexOfId(id) {
    return todoListStore.findIndex(item => item.id === id);
}

function removeTodoItem(id) {
    const index = todoListStore.findIndex(item => item.id === id);
    if (index !== -1) {
        todoListStore.splice(index, 1);
    } else {
        throw `${id}라는 ID를 가진 요소가 없습니다!`;
    }
}

async function toggleStateTodoItem(userId, todoId) {
    const toggledUser = await toggleItem(userId, todoId);
    const userIndex = indexOfId(todoId);
    todoListStore[userIndex] = createTodoItem(toggledUser._id, toggledUser.contents, toggledUser.isCompleted);
}
