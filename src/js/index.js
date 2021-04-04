import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import * as template from "./template.js";

window.onload = onLoadUsers;

async function onLoadUsers() {
    const $userList = document.querySelector("#user-list")
    const responseUsers = await fetch(uri.users, form.get());
    const users = await responseUsers.json();

    while($userList.children.length > 2) {
        $userList.removeChild($userList.firstChild);
    }

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

    await fetch(uri.users, form.postCreateUser(userName));
    await onLoadUsers();
}

const userCreateButton = document.querySelector('.user-create-button');
userCreateButton.addEventListener('click', onUserCreateHandler);

const createElementByString = (string) => {
    return document.createRange().createContextualFragment(string);
}