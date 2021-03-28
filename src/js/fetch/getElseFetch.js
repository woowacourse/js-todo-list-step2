export default function (url, {method = "get", body = ""}) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`, {
        method: method,
        mode: "cors",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}