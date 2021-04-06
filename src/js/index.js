const url = "https://js-todo-list-9ca3a.df.r.appspot.com";
const userList = document.getElementById('user-list');
const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

function addUser(userName) {
    fetch(url + '/api/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName
        }),
    }).then((response) => updateUserList());
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
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)
