import * as service from '../../service.js';
import * as user from './UserComponent.js';

export function addEvent() {
    const $userCreateButton = document.querySelector('.user-create-button')
    $userCreateButton.addEventListener('click', onUserCreateHandler)
}

const onUserCreateHandler = async () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    const createUserApi = await service.createUser(userName);
    const userId = createUserApi.data._id;
    addUser(userName, userId);
}

const addUser = (userName, userId) => {
    const $userList = document.querySelector('#user-list')
    const $userCreateButton = document.querySelector('.user-create-button')
    const userButton = user.createUserElement(userName, userId);
    $userList.insertBefore(userButton, $userCreateButton);
}