import userListTemplate from "../template/userListTemplate.js";
import {addUserFetch, deleteUserFetch, getUsersFetch} from "../fetch/userFetch.js";

export {addUser, getUsers, deleteUser};

const $userList = document.querySelector('#user-list');

async function addUser(userName) {
    const addedUserId = await addUserFetch(userName).then(data => data._id);
    getUsers(addedUserId);
}

async function deleteUser(userId) {
    await deleteUserFetch(userId);
    getUsers();
}

function getUsers(addedUserId) {
    getUsersFetch().then(userList => renderUserList(userList, addedUserId));
}

function renderUserList(users, addedUserId) {
    $userList.querySelectorAll('.user-button').forEach(ele => ele.remove());
    users.forEach(user => {
        if (user._id === addedUserId) {
            $userList.insertAdjacentHTML('afterbegin', userListTemplate(user._id, user.name, true))
        } else {
            $userList.insertAdjacentHTML('afterbegin', userListTemplate(user._id, user.name))
        }
    })
}