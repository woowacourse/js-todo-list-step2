window.onload = setUpUserList;
const url = "https://js-todo-list-9ca3a.df.r.appspot.com";
const userList = document.getElementById('user-list');
const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

async function setUpUserList() {
    await fetch(url + '/api/users')
        .then((response) => response.json())
        .then((data) => addUserList(data))
        .then((data) => {
            const list = document.querySelector('.ripple')
            list.classList.add("active")
        });
}

const onUserDeleteHandler = (e) => {
    const selectedUser = document.querySelector('.active')
    const wantDelete = confirm(selectedUser.innerText + "을 삭제하시겠습니까?");
    if (wantDelete) deleteUser(selectedUser);
}

function deleteUser(selectedUser) {
    fetch(url + '/api/users/' + selectedUser.id, userDeleteOp)
        .then((response) => updateUserList())
        .catch((e) => console.log(e));
}

async function addUser(userName) {
    fetch(url + '/api/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName
        })
    }).then((response) => updateUserList());
}


async function updateUserList() {
    fetch(url + '/api/users')
        .then((response) => response.json())
        .then((data) => clearUserList(data))
        .then((data) => addUserList(data));
}

function clearUserList(data) {
    const count = userList.children.length;
    for (let i = 0; i < count -2; i++) {
        userList.removeChild(userList.firstChild)
    }
    return data;
}

async function addUserList(userListData) {
    for (let i = 0; i < userListData.length; i++) {
        let userButton = document.createElement("button");
        userButton.className = "ripple";
        userButton.id = userListData[i]._id;
        userButton.addEventListener("click", selectUser);
        userButton.innerText = userListData[i].name;
        userList.insertBefore(userButton, userList.children[userList.children.length - 2]);
    }
}

function selectUser(e) {
    const selectedUser = document.querySelector('.active')
    selectedUser.classList.remove('active');
    e.target.classList.add('active');
}

const userCreateButton = document.querySelector('.user-create-button')
const userDeleteButton = document.querySelector('.user-delete-button')
userCreateButton.addEventListener('click', onUserCreateHandler)
userDeleteButton.addEventListener('click', onUserDeleteHandler)


const userDeleteOp = {
    method: "DELETE"
}
