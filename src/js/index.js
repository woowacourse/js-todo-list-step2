import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {templateUser} from "./template.js";
import {onUserCreateHandler} from "./createUser.js";
import {onUserDeleteHandler} from "./deleteUser.js";
import {
    onActiveFilterHandler,
    onAllFilterHandler, onCompletedFilterHandler,
    onLoadUserItemsHandler
} from "./loadUserItems.js";
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


const $filters = document.querySelector('.filters');

export const $allFilter = $filters.querySelector('.all');
$allFilter.addEventListener('click', onAllFilterHandler);

export const $activeFilter = $filters.querySelector('.active');
$activeFilter.addEventListener('click', onActiveFilterHandler);

export const $completedFilter = $filters.querySelector('.completed');
$completedFilter.addEventListener('click', onCompletedFilterHandler);

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
    const $userTitle = document.querySelector("#user-title");
    const $strongTag = $userTitle.querySelector("strong");

    for (const $child of $userList.children) {
        if ($child.getAttribute("data-id") === dataId) {
            $strongTag.innerText = $child.innerText;
            $child.classList.add("active");
        } else {
            $child.classList.remove("active");
        }
    }
}

window.onload = onLoadUsers();