const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const users = BASE_URL + "/api/users/";
const items = "/items/";

export const allTodoItems = (userId) => {
    return users + userId + items;
}

export const todoItem = (userId, itemId) => {
    return users + userId + items + itemId;
}

export const toggleTodoItem = (userId, itemId) => {
    return users + userId + items + itemId + "/toggle/";
}
