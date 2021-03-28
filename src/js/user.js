import {addUser, getUsers} from "./store/userController.js";
import {deleteUserFetch} from "./fetch/userFetch.js";

const $userCreateButton = document.querySelector('.user-create-button')
const $userDeleteButton = document.querySelector('.user-delete-button')
const $userButtonList = document.querySelector('#user-list')

$userCreateButton.addEventListener('click', onUserCreateHandler)
$userButtonList.addEventListener('click', onUserSelectHandler)
$userDeleteButton.addEventListener('click', onUserDeleteHandle)
getUsers();

function onUserCreateHandler() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

function onUserSelectHandler(event) {
    if (event.target && event.target.classList.contains("user-button")) {
        const buttons = event.target.closest('#user-list').querySelectorAll('.user-button');
        buttons.forEach(btn => btn.classList.remove('active'))
        event.target.classList.add('active');
    }
}

function onUserDeleteHandle(event) {
    let id = document.querySelector('#user-list .active').getAttribute("id");
    deleteUserFetch(id);
}
