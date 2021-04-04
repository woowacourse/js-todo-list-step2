import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import * as template from "./template.js";

const $userList = document.querySelector("#user-list");

window.onload = onLoadUsers;

async function onLoadUsers() {
    const responseUsers = await fetch(uri.users, form.get());
    const users = await responseUsers.json();

    for (const user of users) {
        const userDom = createElementByString(template.user(user._id, user.name));
        $userList.prepend(userDom);
    }
}

const onUserCreateHandler = async () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (userName.length < 2) {
        window.alert("2글자 이상이어야 합니다.");
        return;
    }

    const response = await fetch(uri.users, form.postCreateUser(userName));
    const user = await response.json();
    $userList.prepend(createElementByString(template.user(user._id, user.name)));
}

const userCreateButton = document.querySelector('.user-create-button');
userCreateButton.addEventListener('click', onUserCreateHandler);

const createElementByString = (string) => {
    return document.createRange().createContextualFragment(string);
}