export const SELECTOR = {
    USER_TITLE: "#user-title",
    USER_LIST: "#user-list",
    USER_CREATE_BUTTON: ".user-create-button",
    USER_DELETE_BUTTON: ".user-delete-button",

    NEW_TODO: ".new-todo",
    TODO_LIST: ".todo-list",
    CHIP: ".chip",
    DESTROY: ".destroy",
    EDIT: ".edit",

    TODO_COUNT: ".todo-count",
    FILTERS: ".filters",
    CLEAR_COMPLETED: ".clear-completed",

    ACTIVE: "button.active",
    LABEL: ".label",
    TOGGLE: ".toggle",
}

export const CLASS = {
    ACTIVE: "active",
    SELECTED: "selected",
    PRIMARY: "primary",
    SECONDARY: "secondary",
    NAME: "name",
    CHECKED: "checked",
    COMPLETED: "completed",
    TOGGLE: "toggle",
    ALL: "all"
}

export const NODE_NAME = {
    SELECT: "SELECT"
}

export const URL = {
    USER: "https://js-todo-list-9ca3a.df.r.appspot.com/api/users",
    ITEMS: userId => `https://js-todo-list-9ca3a.df.r.appspot.com/api/users/${userId}/items`,
    DELETE: userId => `https://js-todo-list-9ca3a.df.r.appspot.com/api/users/${userId}`,
    CHANGE_PRIORITY: (userId, itemId) => `https://js-todo-list-9ca3a.df.r.appspot.com/api/users/${userId}/items/${itemId}/priority`,
    CHANGE_TOGGLE: (userId, itemId) => `https://js-todo-list-9ca3a.df.r.appspot.com/api/users/${userId}/items/${itemId}/toggle`
}

