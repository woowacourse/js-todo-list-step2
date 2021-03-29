export default function (url, body = {}) {
    return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com${url}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}