window.onload = onLoadUsers;

import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {templateUser} from "./template.js";
import {onLoadUserItemsHandler} from "./loadUserItems.js";
import {onUserCreateHandler} from "./createUser.js";
import {onNewTodoHandler} from "./addUserItem.js";

export const $userList = document.querySelector("#user-list");
$userList.addEventListener('click', onLoadUserItemsHandler);

const $userCreateButton = document.querySelector('.user-create-button');
$userCreateButton.addEventListener('click', onUserCreateHandler);

export const $newTodoInput = document.querySelector('.new-todo');
$newTodoInput.addEventListener('keyup', onNewTodoHandler);

async function onLoadUsers() {
    const responseUsers = await fetch(uri.users, form.get());
    const users = await responseUsers.json();

    for (const user of users) {
        const userDom = createElementByString(templateUser(user._id, user.name));
        $userList.prepend(userDom);
    }
}

export const createElementByString = (string) => {
    return document.createRange().createContextualFragment(string);
}

export const activeUser = (dataId) => {
    for (const $child of $userList.children) {
        if($child.getAttribute("data-id") === dataId) {
            $child.classList.add("active");
        } else {
            $child.classList.remove("active");
        }
    }
}