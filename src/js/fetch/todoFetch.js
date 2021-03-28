import getElseFetch from "./getElseFetch.js";
import getFetch from "./getFetch.js";

function getTodoFetch(userId) {
    return getFetch(`/api/users/${userId}/items/`)
        .then(response => response.json())
}

function deleteAllTodoFetch(userId) {
    return getElseFetch(`/api/users/${userId}/items/`, {method: 'DELETE'})
        .then(response => response.json())
}

function deleteEachTodoFetch(userId, itemId) {
    return getElseFetch(`/api/users/${userId}/items/${itemId}`, {method: 'DELETE'})
        .then(response => response.json())
}

function updateEachTodoFetch(userId, itemId, updateContents) {
    return getElseFetch(`/api/users/${userId}/items/${itemId}`, {method: 'PUT', body: {contents: `${updateContents}`}})
        .then(response => response.json())
}

function toggleItem(userId, itemId) {
    return getElseFetch(`/api/users/${userId}/items/${itemId}/toggle`, {method: 'PUT'})
        .then(response => response.json())
}

async function addUserFetch(userId, contents) {
    await getElseFetch(`/api/users/${userId}/items/`, {method: "POST", body: {contents: `${contents}`}})
        .then(response => response.json())
}