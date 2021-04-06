window.onload = setUpUserList;
const url = "https://js-todo-list-9ca3a.df.r.appspot.com";
const userList = document.getElementById('user-list');
const todoList = document.querySelector('.todo-list');
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

function onInputNewTodo(e) {
    if (e.key == 'Enter') {
        const selectUser = document.querySelector('.active').id;
        fetch(url + `/api/users/${selectUser}/items/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: e.target.value
            })
        }).then((response) => showSelectedUserTodo(selectUser))
            .then(e.target.value = "")
    }
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
    for (let i = 0; i < count - 2; i++) {
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
    showSelectedUserTodo(e.target.id);
}

function showSelectedUserTodo(userId) {
    fetch(url + `/api/users/${userId}/items/`)
        .then((response) => response.json())
        .then((data) => updateTodos(data))
}

async function updateTodos(todos) {
    todoList.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        let todoLI =
            ` <li id="${todos[i]._id}">
                 <div class="view">
                    <input class="toggle" onclick= "onToggleTodo(this)" type="checkbox" />
                    <label class="label" ondblclick= "onEditItem">${todos[i].contents}</label>
                    <button class="destroy" onclick= "onDeleteItem"></button>
                 </div>
                 <input class="edit" value=${todos[i].contents} />
             </li>`
        todoList.insertAdjacentHTML('beforeend', todoLI);
        if (todos[i].isCompleted) {
            todoList.children[i].className ="completed";
        }
    }
}

function onToggleTodo(toggle) {
    const selectedUserId = document.querySelector('.active').id
    fetch(url + `/api/users/${selectedUserId}/items/${toggle.parentNode.parentNode.id}/toggle`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    }).then((response) => showSelectedUserTodo(document.querySelector('.active').id))
}

const userCreateButton = document.querySelector('.user-create-button')
const userDeleteButton = document.querySelector('.user-delete-button')
const newTodo = document.querySelector('.new-todo');
userCreateButton.addEventListener('click', onUserCreateHandler)
userDeleteButton.addEventListener('click', onUserDeleteHandler)
newTodo.addEventListener('keydown', onInputNewTodo);

const userDeleteOp = {
    method: "DELETE"
}
