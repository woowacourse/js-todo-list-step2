import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {templateUser} from "./template.js";
import {$userList, activeUser, createElementByString} from "./index.js";

export const onUserCreateHandler = async () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

    if (!userName) {
        return;
    }

    if (userName.length < 2) {
        window.alert("2글자 이상이어야 합니다.");
        return;
    }

    const response = await fetch(uri.users, form.postCreateUser(userName));
    const user = await response.json();

    const $userElement = createElementByString(templateUser(user._id, user.name));
    $userList.prepend($userElement);

    activeUser(user._id);
    const $todoList = document.querySelector(".todo-list");
    $todoList.innerHTML = '';
}
