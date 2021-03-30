import userListTemplate from "../template/userListTemplate.js";
import {addUserFetch, deleteUserFetch, getUsersFetch} from "../fetch/userFetch.js";
import {execute} from "./todoListStoreAccessor.js";

export {addUser, getUsers, deleteUser};

const $userList = document.querySelector('#user-list');

async function addUser(userName) {
    if (userName.length < 2) {
        alert("유저 이름은 두 글자 이상이어야 합니다!");
        return false;
    }
    const addedUserId = await addUserFetch(userName).then(data => data._id);
    getUsers(addedUserId);
}

async function deleteUser(userId) {
    await deleteUserFetch(userId);
    execute("clear");
    getUsers();
}

function getUsers(addedUserId) {
    return getUsersFetch().then(userList => renderUserList(userList, addedUserId));
}

function renderUserList(users, addedUserId) {
    $userList.querySelectorAll('.user-button').forEach(ele => ele.remove());
    users.forEach(user => {
        $userList.insertAdjacentHTML('afterbegin', userListTemplate(user._id, user.name))
        if (user._id === addedUserId) {
            document.querySelector('#' + user._id).click();
        }
    })
}