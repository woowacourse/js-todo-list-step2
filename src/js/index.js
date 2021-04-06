window.onload = setUpUserList;
const url = "https://js-todo-list-9ca3a.df.r.appspot.com";
const userList = document.getElementById('user-list');
const todoList = document.querySelector('.todo-list');
const filterUL = document.querySelector('.filters');
const all = filterUL.children[0].children[0];
const active = filterUL.children[1].children[0];
const completed = filterUL.children[2].children[0];
const listCount = document.getElementsByClassName("todo-count")[0].childNodes[1];

all.addEventListener("click", onFilterAll);

function onFilterAll() {
    active.classList.remove("selected");
    completed.classList.remove("selected");
    this.classList.add("selected");

    let index = 0;
    const todoListLI = todoList.getElementsByTagName("li");
    for (index; index < todoListLI.length; index++) {
        todoListLI[index].style.display = "block"
    }
    setCount(index);
}

active.addEventListener("click", onFilterActive);

function onFilterActive() {
    all.classList.remove("selected");
    completed.classList.remove("selected");
    this.classList.add("selected");
    const todoListLI = todoList.getElementsByTagName("li");
    let index = 0;
    for (let i = 0; i < todoListLI.length; i++) {
        if (todoListLI[i].className == "completed") {
            todoListLI[i].style.display = "none"
        } else {
            todoListLI[i].style.display = "block"
            index++;
        }
    }
    setCount(index);
}

completed.addEventListener("click", onFilterCompleted);

function onFilterCompleted() {
    all.classList.remove("selected");
    active.classList.remove("selected");
    this.classList.add("selected");
    const todoListLI = todoList.getElementsByTagName("li");

    let index = 0;
    for (let i = 0; i < todoListLI.length; i++) {
        if (todoListLI[i].className == "completed") {
            todoListLI[i].style.display = "block"
            index++;
        } else {
            todoListLI[i].style.display = "none"
        }
    }
    setCount(index);
}

function setCount(index) {
    listCount.innerHTML = index;
}

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
        .then((index) => setCount(index))
}

async function updateTodos(todos) {
    todoList.innerHTML = '';
    let index = 0;
    for (index; index < todos.length; index++) {
        let todoLI =
            `<li id="${todos[index]._id}" onkeydown="onChangeMode(event)">
<div class="view">
<input class="toggle" onclick= "onToggleTodo(this)" type="checkbox" />
<label class="label" ondblclick= "onEditItem(this)">${todos[index].contents}</label>
<button class="destroy" onclick= "onDeleteItem(this)"></button>
</div><input class="edit" value=${todos[index].contents} />
</li>`
        todoList.insertAdjacentHTML('beforeend', todoLI);
        if (todos[index].isCompleted) {
            todoList.children[index].className = "completed";
        }
    }
    return index;
}


function onChangeMode(e) {
    let originalValue = (e.target.parentNode.getElementsByClassName("label")[0].innerText);
    if (e.key === "Escape") {
        let selectedLI = e.target.closest('li');
        selectedLI.classList.remove('editing')
        return;
    }
    if (e.key === "Enter") {
        let selectedLI = e.target.closest('li');
        let editedValue = selectedLI.getElementsByClassName("edit")[0].value;
        selectedLI.getElementsByClassName("edit")[0].value = editedValue;
        let input = e.target;
        const itemId = input.previousSibling.parentNode.id;
        const selectedUserId = document.querySelector('.active').id;
        fetch(url + `/api/users/${selectedUserId}/items/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: editedValue
            })
        }).then((response) => showSelectedUserTodo(selectedUserId))
            .then(() => selectedLI.classList.remove('editing'));
    }
}

function onEditItem(editInput) {
    const editInputParent = editInput.parentNode.parentNode;
    editInputParent.addEventListener('keydown', onChangeMode)
    editInputParent.classList.add('editing');
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

function onDeleteItem(button) {
    const selectedUserId = document.querySelector('.active').id
    fetch(url + `/api/users/${selectedUserId}/items/${button.parentNode.parentNode.id}`, {
        method: "DELETE",
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
