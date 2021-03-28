import getElseFetch from "./getElseFetch.js";
import getFetch from "./getFetch.js";
export {addUserFetch, getUsersFetch, deleteUserFetch}

function getUsersFetch() {
    return getFetch('/api/users')
        .then(response => response.json())
}

function deleteUserFetch(_id) {
    return getElseFetch(`/api/users/${_id}`, {method: 'DELETE'})
        .then(response => response.json())
}

async function addUserFetch(userName) {
    await getElseFetch('/api/users', {method: "POST", body: {name: `${userName}`}})
        .then(response => response.json())
}

