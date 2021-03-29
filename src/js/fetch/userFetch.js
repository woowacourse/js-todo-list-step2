import postFetch from "./postFetch.js";
import deleteFetch from "./deleteFetch.js";
import getFetch from "./getFetch.js";

export {addUserFetch, getUsersFetch, deleteUserFetch}

function getUsersFetch() {
    return getFetch('/api/users')
        .then(response => response.json())
}

function deleteUserFetch(id) {
    return deleteFetch(`/api/users/${id}`)
}

function addUserFetch(userName) {
    return postFetch('/api/users', {name: `${userName}`})
        .then(response => response.json())
}

