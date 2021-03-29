import {deleteFetch, getFetch, postFetch, putFetch} from "./methodFetches.js";

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
    return deleteFetch(`/api/users/${userId}/items/${itemId}`)
        .then(response => response.json())
}

function updateEachTodoFetch(userId, itemId, updateContents) {
    return putFetch(`/api/users/${userId}/items/${itemId}`, {contents: `${updateContents}`})
        .then(response => response.json())
}

function toggleItem(userId, itemId) {
    return putFetch(`/api/users/${userId}/items/${itemId}/toggle`, {method: 'PUT'})
        .then(response => response.json())
}

function addTodoFetch(userId, contents) {
    return postFetch(`/api/users/${userId}/items/`, {contents: `${contents}`})
        .then(response => response.json())
}