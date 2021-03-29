import postFetch from "./postFetch.js";
import deleteFetch from "./deleteFetch.js";
import getFetch from "./getFetch.js";

export {addTodoFetch, deleteAllTodoFetch, deleteEachTodoFetch, toggleItem, updateEachTodoFetch, getTodoFetch}

function getTodoFetch(userId) {
    return getFetch(`/api/users/${userId}/items/`)
        .then(response => response.json())
}

function deleteAllTodoFetch(userId) {
    return deleteFetch(`/api/users/${userId}/items/`)
        .then(response => response.json())
}

function deleteEachTodoFetch(userId, itemId) {
    return postFetch(`/api/users/${userId}/items/${itemId}`)
        .then(response => response.json())
}

function updateEachTodoFetch(userId, itemId, updateContents) {
    // return postFetch(`/api/users/${userId}/items/${itemId}`, {method: 'PUT', body: {contents: `${updateContents}`}})
    //    .then(response => response.json())
}

function toggleItem(userId, itemId) {
    // return postFetch(`/api/users/${userId}/items/${itemId}/toggle`, {method: 'PUT'})
    //     .then(response => response.json())
}

function addTodoFetch(userId, contents) {
    return postFetch(`/api/users/${userId}/items/`, {contents: `${contents}`})
        .then(response => response.json())
}