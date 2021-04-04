window.onload = onLoadUsers;

import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {templateUser} from "./template.js";
import {onLoadUserItemsHandler} from "./loadUserItems.js";
import {onUserCreateHandler} from "./createUser.js";

export const $userList = document.querySelector("#user-list");
$userList.addEventListener('click', onLoadUserItemsHandler);

const $userCreateButton = document.querySelector('.user-create-button');
$userCreateButton.addEventListener('click', onUserCreateHandler);

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