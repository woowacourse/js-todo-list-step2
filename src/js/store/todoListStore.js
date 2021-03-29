export {addTodoItem, updateTodoItem, removeTodoItem, findById, toggleStateTodoItem, deepCopyStore}
import {addTodoFetch} from "../fetch/todoFetch.js";

const todoListStore = [];

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

function removeTodoItem(id) {
    const index = todoListStore.findIndex(item => item.id === id);
    if (index !== -1) {
        todoListStore.splice(index, 1);
    } else {
        throw `${id}라는 ID를 가진 요소가 없습니다!`;
    }
}

function toggleStateTodoItem(id) {
    const element = findById(id);
    if (element.state === "completed") {
        element.state = "active";
    } else {
        element.state = "completed";
    }
}
