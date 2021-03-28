import userListTemplate from "../template/userListTemplate.js";
import {addUserFetch, getUsersFetch} from "../fetch/userFetch.js";

export {addUser, getUsers};

const $userList = document.querySelector('#user-list');

async function addUser(userName) {
    await addUserFetch(userName);
    getUsers();
}

function getUsers(){
    getUsersFetch().then(userList => renderUserList(userList));
}

function renderUserList(users) {
    $userList.querySelectorAll('.user-button').forEach(ele => ele.remove());
    users.forEach(user => {
        $userList.insertAdjacentHTML('afterbegin', userListTemplate(user._id, user.name))
    })
}