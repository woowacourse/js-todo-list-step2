export {addUserFetch, getUsersFetch, deleteUserFetch}

function fetchToApiWithGetMethod(url) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`);
}

function fetchToApiWithoutGetMethod(url, {method = "get", body = ""}) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`, {
        method: method,
        mode: "cors",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function getUsersFetch() {
    return fetchToApiWithGetMethod('/api/users')
        .then(response => response.json())
}

function deleteUserFetch(_id) {
    fetchToApiWithoutGetMethod(`/api/users/${_id}`, {method: 'DELETE'})
        .then(response => response.json())
}

async function addUserFetch(userName) {
    await fetchToApiWithoutGetMethod('/api/users', {method: "POST", body: {name: `${userName}`}})
        .then(response => response.json())
}

