const url = "https://js-todo-list-9ca3a.df.r.appspot.com";
const userList = document.getElementById('user-list');
const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

const onUserDeleteHandler = (e) => {
    const selectedUser = document.querySelector('.active')
    const wantDelete = alert(selectedUser.innerText + "을 삭제하시겠습니까?");
    if (wantDelete) deleteUser(e.target.id);
}

function deleteUser(userId) {
    fetch(url + '/api/users/' + userId, userDeleteOp)
        .then((response) => console.log(response));
}

function addUser(userName) {
    fetch(url + '/api/users', userPostOp)
        .then((response) => updateUserList());
}


function updateUserList() {
    fetch(url + '/api/users')
        .then((response) => response.json())
        .then((data) => addUserList(data));
}

function addUserList(userListData) {
    for (let i = 0; i < userListData.length; i++) {
        let userButton = document.createElement("button");
        userButton.className = "ripple";
        userButton.id = userListData[i]._id;
        userButton.addEventListener("click", selectUser(this));
        userButton.innerText = userListData[i].name;
        userList.insertBefore(userButton, userList.children[userList.children.length - 2]);
    }
}

function selectUser(userButton) {
    fetch(url + "/api/users" + userButton.id)
        .then()
}

const userCreateButton = document.querySelector('.user-create-button')
const userDeleteButton = document.querySelector('.user-delete-button')
userCreateButton.addEventListener('click', onUserCreateHandler)
userDeleteButton.addEventListener('click', onUserDeleteHandler)


const userDeleteOp = {
    method: "DELETE"
}

const userPostOp = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name: userName
    })
}