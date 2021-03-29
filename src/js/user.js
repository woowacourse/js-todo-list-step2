import {addUser, deleteUser, getUsers} from "./store/userController.js";
import {execute} from "./store/todoListStoreAccessor.js";

export {currentUserId}
const $userCreateButton = document.querySelector('.user-create-button')
const $userDeleteButton = document.querySelector('.user-delete-button')
const $userButtonList = document.querySelector('#user-list')

$userCreateButton.addEventListener('click', onUserCreateHandler)
$userButtonList.addEventListener('click', onUserSelectHandler)
$userDeleteButton.addEventListener('click', onUserDeleteHandle)
getUsers();

function currentUserId() {
    return document.querySelector('#user-list .active').getAttribute("id");
}

function onUserCreateHandler() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

async function onUserSelectHandler(event) {
    if (event.target && event.target.classList.contains("user-button")) {
        const buttons = event.target.closest('#user-list').querySelectorAll('.user-button');
        buttons.forEach(btn => btn.classList.remove('active'))
        event.target.classList.add('active');
        execute("get", {id: currentUserId()})
    }
}

function onUserDeleteHandle(event) {
    deleteUser(currentUserId());
}
