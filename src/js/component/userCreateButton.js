import * as service from '../service.js';

export function addEvent() {
    const $userCreateButton = document.querySelector('.user-create-button')
    $userCreateButton.addEventListener('click', onUserCreateHandler)
}

const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    service.createUser(userName);
    addUser(userName);
}

const addUser = (userName) => {
    const $userList = document.querySelector('#user-list')
    const $userCreateButton = document.querySelector('.user-create-button')
    const element = document.createElement("button");
    element.className = "ripple";
    element.textContent = userName;
    $userList.insertBefore(element, $userCreateButton);
}