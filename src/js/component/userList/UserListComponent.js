import * as UserCreateButton from './UserCreateButtonComponent.js';
import * as UserDeleteButton from './UserDeleteButtonComponent.js';
import * as UserComponent from './UserComponent.js';
import * as service from '../../service.js';
import * as TodoList from './TodoListComponent.js';

export async function addEvent() {
    UserCreateButton.addEvent();
    UserDeleteButton.addEvent();
}

export async function getUsersAndRender() {
    const $userList = document.querySelector('#user-list')
    const $userCreateButton = document.querySelector('.user-create-button')
    const getUsersApi = await service.getUsers();
    const users = getUsersApi.data;
    for (let i = 0; i < users.length; i++) {
        const button = UserComponent.createUserElement(users[i].name, users[i]._id);
        $userList.insertBefore(button, $userCreateButton);
    }
    setActiveToFirstUser();
    TodoList.getTodoListAndRender(users[0]._id);
}

function setActiveToFirstUser() {
    const $firstUser = document.querySelector('.ripple');
    $firstUser.classList.add("active");
}