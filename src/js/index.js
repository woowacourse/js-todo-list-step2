import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import * as template from "./template.js";

window.onload = onLoadUsers;

async function onLoadUsers() {
    const $userList = document.querySelector("#user-list")
    const responseUsers = await fetch(uri.getUsers, form.get());
    const users = await responseUsers.json();

    for (const user of users) {
        const userDom = document.createRange()
        .createContextualFragment(template.user(user._id, user.name));

        $userList.prepend(userDom);
    }
}

const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

