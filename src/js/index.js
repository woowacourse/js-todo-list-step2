const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

function showAllUsersForm() {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

async function showAllUsers(userId) {
    const showAllUsersResponse = await fetch(BASE_URL + "/api/users", showAllUsersForm());
    const allUsers = await showAllUsersResponse.json();
    const userList = document.getElementById("user-list");
    for (let i = 0; i < allUsers.length; i++) {
        if (document.getElementById(allUsers[i]._id) == null) {
            const userButton = document.createElement("button");
            userButton.id = allUsers[i]._id;
            userButton.innerText = allUsers[i].name;
            userButton.classList.add("ripple");
            userList.prepend(userButton);
        }
    }
    showActiveUser(userId, userList);
}

function showActiveUser(userId, userList) {
    const activeUser = document.getElementById(userId);
    if (activeUser == null) {
        userList.firstChild.classList.add("active");
    } else {
        const activeUsers = document.getElementsByClassName("active");
        for (let i = 0; i < activeUsers.length; i++) {
            activeUsers[i].classList.remove("active");
        }
        activeUser.classList.add("active");
    }
}

async function userCreateHandler() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (userName.length >= 2) {
        const userForm = createUserForm(userName);
        const createdUserId = await createUser(userForm);
        await showAllUsers(createdUserId);
    } else {
        alert("이름은 두 글자 이상이어야 합니다!");
    }
}

async function createUser(userForm) {
    const createdUserResponse = await fetch(BASE_URL + "/api/users", userForm);
    const createdUser = await createdUserResponse.json();
    return createdUser._id;
}

function createUserForm(userName) {
    const newUser = {
        name: userName
    };

    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    };
}

showAllUsers(0);
const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', userCreateHandler)

