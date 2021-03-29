import axios from './axios.js';

export async function getUsers() {
    return await axios({
        method: 'get',
        url: `/users`,
    });
}

export async function createUser(name) {
    return await axios({
        method: 'post',
        url: `/users`,
        data: {
            name
        }
    })
}

export async function getUser(userId) {
    return await axios({
        method: 'get',
        url: `/users/${userId}`
    });
}

export async function deleteUser(userId) {
    return await axios({
        method: 'delete',
        url: `/users/${userId}`
    })
}

export async function getTodoItems(userId) {
    return await axios({
        method: 'get',
        url: `/users/${userId}/items`
    });
}

export async function createTodoItem(userId, contents) {
    return await axios({
        method: 'post',
        url: `/users/${userId}/items`,
        data: {
            contents
        }
    });
}

export async function deleteAllTodoItems(userId) {
    return await axios({
        method: 'delete',
        url: `/users/${userId}/items`
    });
}

export async function deleteTodoItem(userId, itemId) {
    return await axios({
        method: 'delete',
        url: `/users/${userId}/items/${itemId}`
    });
}

export async function updateTodoItem(userId, itemId, contents) {
    return await axios({
        method: 'put',
        url: `/users/${userId}/items/${itemId}`,
        data: {
            contents
        }
    });
}

export async function updateTodoItemPriority(userId, itemId, priority) {
    return await axios({
        method: 'put',
        url: `/users/${userId}/items/${itemId}/priority`,
        data: {
            priority
        }
    });
}

export async function toggleTodoItemToBeCompleted(userId, itemId, priority) {
    return await axios({
        method: 'put',
        url: `/users/${userId}/items/${itemId}/toggle`,
    });
}