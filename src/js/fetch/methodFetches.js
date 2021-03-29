export {deleteFetch, getFetch, postFetch, putFetch}

function deleteFetch(url) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`, {
        method: "delete"
    });
}

function getFetch(url) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`);
}

function postFetch(url, body = {}) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function putFetch(url, body = {}) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`, {
        method: "put",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}