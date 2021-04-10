const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const users = BASE_URL + "/api/users/";
const items = "/items/";

export const userTodoItems = (id) => {
    return users + id + items;
}

export const deleteTodoItem = (userId, itemId) => {
    return users + userId + items + itemId;
}

export const deleteAllTodoItems = (userId) => {
    return users + userId + items;
}