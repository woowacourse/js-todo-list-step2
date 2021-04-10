import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {templateUser} from "./template.js";
import {onUserCreateHandler} from "./createUser.js";
import {onUserDeleteHandler} from "./deleteUser.js";
import {onLoadUserItemsHandler} from "./loadUserItems.js";
import {onNewTodoHandler} from "./addUserItem.js";
import {
    onDestroyAllItemsHandler,
    onDestroyItemHandler
} from "./destroyUserItem.js";
import {onEditItemHandler} from "./editUserItem.js";
import {onToggleItemHandler} from "./toggleUserItem.js";
import {onPriorityItemHandler} from "./priorityUserItem.js";

export const $userList = document.querySelector("#user-list");
$userList.addEventListener('click', onLoadUserItemsHandler);

const $userCreateButton = document.querySelector('.user-create-button');
$userCreateButton.addEventListener('click', onUserCreateHandler);

const $userDeleteButton = document.querySelector('.user-delete-button');
$userDeleteButton.addEventListener('click', onUserDeleteHandler);

export const $newTodoInput = document.querySelector('.new-todo');
$newTodoInput.addEventListener('keyup', onNewTodoHandler);

const $todoList = document.querySelector('.todo-list');
$todoList.addEventListener('click', onDestroyItemHandler);
$todoList.addEventListener('click', onToggleItemHandler);
$todoList.addEventListener('dblclick', onEditItemHandler);
$todoList.addEventListener('change', onPriorityItemHandler);

const $clearCompletedButton = document.querySelector('.clear-completed');
$clearCompletedButton.addEventListener('click', onDestroyAllItemsHandler);

export const onLoadUsers = async () => {
    const responseUsers = await fetch(uri.users, form.get());
    const users = await responseUsers.json();

    while ($userList.childElementCount > 2) {
        $userList.removeChild($userList.firstChild);
    }

    for (const user of users) {
        const userDom = createElementByString(
            templateUser(user._id, user.name));
        $userList.prepend(userDom);
    }
}

export const createElementByString = (string) => {
    return document.createRange().createContextualFragment(string);
}

export const activeUser = (dataId) => {
    for (const $child of $userList.children) {
        if ($child.getAttribute("data-id") === dataId) {
            $child.classList.add("active");
        } else {
            $child.classList.remove("active");
        }
    }
}

window.onload = onLoadUsers();