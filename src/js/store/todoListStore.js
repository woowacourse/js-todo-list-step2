export {addTodoItem, removeTodoItemAll, updateTodoItem, removeTodoItem, clear, findById, toggleStateTodoItem, getTodoItems, deepCopyStore}
import {addTodoFetch, deleteEachTodoFetch, deleteAllTodoFetch, getTodoFetch, toggleItem} from "../fetch/todoFetch.js";

let todoListStore = [];

const EMPTY_STRING = "";

function deepCopyStore() {
    return JSON.parse(JSON.stringify(todoListStore));
}

function clear() {
    todoListStore = [];
}

function createTodoItem(id, contents = EMPTY_STRING, isComplete = false) {
    let state = "active";
    if (isComplete) {
        state = "completed";
    }
    return {id: id, contents: contents, state: state}
}


function addTodoItem(id, contents = EMPTY_STRING) {
    return addTodoFetch(id, contents)
        .then(data => todoListStore.push(createTodoItem(data._id, data.contents, data.isComplete)));
}

function getTodoItems(userId) {
    clear();
    return getTodoFetch(userId)
        .then(todos =>
            todos.forEach(todo => todoListStore.push(createTodoItem(todo._id, todo.contents, todo.isComplete))));
}

function updateTodoItem(id, insert = EMPTY_STRING) {
    findById(id).contents = insert;
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

async function removeTodoItem(userId, todoId) {
    await deleteEachTodoFetch(userId, todoId);
    await getTodoItems(userId);
}

async function removeTodoItemAll(userId) {
    await deleteAllTodoFetch(userId);
    await getTodoItems(userId);
}

async function toggleStateTodoItem(userId, todoId) {
    const toggledUser = await toggleItem(userId, todoId);
    const userIndex = indexOfId(todoId);
    todoListStore[userIndex] = createTodoItem(toggledUser._id, toggledUser.contents, toggledUser.isCompleted);
}
