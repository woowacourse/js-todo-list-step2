export {addTodoItem, updateTodoItem, removeTodoItem, findById, toggleStateTodoItem, deepCopyStore}

const todoListStore = [];

const EMPTY_STRING = "";

function deepCopyStore() {
    console.log(todoListStore);
    return JSON.parse(JSON.stringify(todoListStore));
}

function createTodoItem(id, title = EMPTY_STRING, state = "active") {
    return {id: `i-${id}`, title: title, state: state}
}

function addTodoItem(id, title = EMPTY_STRING) {
    todoListStore.push(createTodoItem(id, title));
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
