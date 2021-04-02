const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const userList = document.getElementById("user-list");
const userCreateButton = document.querySelector(".user-create-button");
const userDeleteButton = document.querySelector(".user-delete-button");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".new-todo");

function getRequestForm() {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

async function showAllUsers(userId) {
    const showAllUsersResponse = await fetch(BASE_URL + "/api/users", getRequestForm());
    const allUsers = await showAllUsersResponse.json();
    for (let i = 0; i < allUsers.length; i++) {
        if (document.getElementById(allUsers[i]._id) == null) {
            const userButton = document.createElement("button");
            userButton.id = allUsers[i]._id;
            userButton.innerText = allUsers[i].name;
            userButton.classList.add("ripple");
            userList.prepend(userButton);
        }
    }
    showActiveUser(userId);
}

function showActiveUser(userId) {
    let activeUser = document.getElementById(userId);
    if (activeUser == null) {
        const defaultUser = userList.firstChild;
        defaultUser.classList.add("active");
        activeUser = defaultUser;
    } else {
        active(activeUser);
    }
    showActiveUserTodo(activeUser);
}

function active(activeUser) {
    const activeUsers = document.getElementsByClassName("active");
    for (let i = 0; i < activeUsers.length; i++) {
        activeUsers[i].classList.remove("active");
    }
    activeUser.classList.add("active");
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

function selectUser(event) {
    const button = event.target.closest("button");
    if (button.id != null) {
        const activeUser = event.target;
        active(activeUser);
        showActiveUserTodo(activeUser);
    }
}

async function showActiveUserTodo(activeUser) {
    const todoByUserIdResponse = await fetch(BASE_URL + "/api/users/" + activeUser.id, getRequestForm());
    const todo = await todoByUserIdResponse.json();
    const activeUserTodo = todo.todoList;
    removeOtherTodo();
    for (let i = 0; i < activeUserTodo.length; i++) {
        const item = activeUserTodo[i].contents;
        todoList.insertAdjacentHTML("beforeend", todoTemplate(item));
    }
}

function removeOtherTodo() {
    while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
}

function todoTemplate(item) {
    return `<li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  ${item}
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value=${item} />
            </li>`;
}

function deleteUserForm() {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

async function deleteUserById() {
    const activeUser = document.querySelector(".active");
    await fetch(BASE_URL + "/api/users/" + activeUser.id, deleteUserForm());
    userDeleteButton.classList.remove("active");
    const deletedUser = document.getElementById(activeUser.id);
    userList.removeChild(deletedUser);
    showActiveUser();
}

function createContentForm(content) {
    const newContents = {
        contents: content
    };

    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContents)
    };
}

async function addTodoByUser(event) {
    const content = event.target.value;
    if (event.key === "Enter" && content.length >= 2) {
        const activeUser = document.querySelector(".active");
        await fetch(BASE_URL + "/api/users/" + activeUser.id + "/items", createContentForm(content));
        todoList.insertAdjacentHTML("beforeend", todoTemplate(content));
        todoInput.value = "";
    }
    if (content.length < 2) {
        alert("내용은 2글자 이상이어야합니다!");
        todoInput.value = "";
    }
}

showAllUsers();

userCreateButton.addEventListener("click", userCreateHandler);
userDeleteButton.addEventListener("click", deleteUserById)
userList.addEventListener("click", selectUser);
todoInput.addEventListener("keypress", addTodoByUser);