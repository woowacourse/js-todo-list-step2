export {addUserFetch, getUsersFetch}

function fetchToApiWithGetMethod(url) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`);
}

function fetchToApiWithoutGetMethod(url, {method = "get", body = ""}) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`, {
        method: method,
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


function addUserFetch(userName) {
    fetchToApiWithoutGetMethod('/api/users', {method: "POST", body: {name: `${userName}`}})
        .then(response => response.json())
}

