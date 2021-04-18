const BASIC_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
const USERS = "/api/users/";

const input = document.querySelector('.new-todo')
input.addEventListener('keyup', inputTodoItem)

const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


const onUserDeleteHandler = async () => {
    const selectedUser = document.querySelector('#user-list').querySelector('.active')
    console.log(selectedUser)
    const userId = selectedUser.dataset.id
    await fetch(BASIC_URL + USERS + userId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })

    loadUsers()
}

const userDeleteButton = document.querySelector('.user-delete-button')
userDeleteButton.addEventListener('click', onUserDeleteHandler)


init();

async function init() {
    await loadUsers();
    await getTodoItem(getCurrentUserId())
}


async function loadUsers() {
    const usersRes = await fetch(BASIC_URL + USERS)
    const users = await usersRes.json();
    const user_list = document.getElementById('user-list')

    user_list.innerHTML = ''
    for (let i = 0; i < users.length; i++) {
        if (i === 0) {
            user_list.innerHTML += generateUserItem(users[i], true)
            continue
        }
        user_list.innerHTML += generateUserItem(users[i], false)
    }
}

async function addUser(userName) {
    const addUserRes = await fetch(BASIC_URL + USERS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName
        }),
    })

    const user = await addUserRes.json()
    const user_list = document.getElementById('user-list')
    const button = `<button class=ripple data-id=${user._id} onClick=selectUser(this)>${user.name}</button>`
    const user_list_contents = user_list.innerHTML
    user_list.innerHTML = button + user_list_contents
}

async function selectUser(element) {
    const ripple_active = document.getElementsByClassName('ripple active');
    for (let i = 0; i < ripple_active.length; i++) {
        ripple_active[i].classList.remove('active')
    }

    element.classList.add("active");
    const userId = element.dataset.id
    await getTodoItem(userId)
}

async function getTodoItem(userId) {
    const todoRes = await fetch(`${BASIC_URL}${USERS}${userId}/items/`)
    const todoList = await todoRes.json();

    console.log(todoList)
    const view_todo_list = document.querySelector('.todo-list');
    view_todo_list.innerHTML = ''
    for (let i = 0; i < todoList.length; i++) {
        let todoItem = todoList[i]
        view_todo_list.innerHTML += generateTodoItem(todoItem._id, todoItem.contents, todoItem.isCompleted)
    }
}

async function inputTodoItem(e) {
    if (e.keyCode !== 13) {
        return
    }
    const userId = getCurrentUserId()
    const contents = document.querySelector('.new-todo').value;
    await addTodoItem(userId, contents)
}

async function addTodoItem(userId, contents) {
    await fetch(`${BASIC_URL}${USERS}${userId}/items/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: contents
        }),
    })

    await getTodoItem(userId)
}


async function toggleTodoItem(element) {
    const userId = getCurrentUserId()
    const itemId = element.parentElement.dataset.id
    const li = element.parentElement.parentElement
    await fetch(`${BASIC_URL}${USERS}${userId}/items/${itemId}/toggle`, {
        method: 'PUT',
    });
    li.classList.toggle('completed')

}

async function deleteTodoItem(element) {
    const userId = getCurrentUserId()
    const itemId = element.parentElement.dataset.id
    await fetch(`${BASIC_URL}${USERS}${userId}/items/${itemId}`, {
        method: 'DELETE',
    });
    await getTodoItem(userId)
}

async function changeToModifiable(element) {
    if (element.classList.contains('editing')) {
        return
    }

    element.classList.add('editing');
    element.addEventListener('keydown', await modifyTodoInput(this));
}


function onKeyTodoItem(event) {
    const parentElement = event.target.parentElement;
    const element = event.target;
    if (!parentElement.classList.contains('editing')) {
        return
    }
    if (event.keyCode === 27) {
        parentElement.classList.remove('editing');
        return
    }

    if (event.keyCode === 13) {
        const itemId = parentElement.firstElementChild.dataset.id;
        console.log("itemId: " + itemId)
        modifyTodoItem(itemId, element)
    }
}

async function modifyTodoItem(itemId, element) {
    const userId = getCurrentUserId()
    const modRes = await fetch(`${BASIC_URL}${USERS}${userId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'contents': "element.value",
        }),
    });

    const parentElement = element.parentElement;
    if (modRes.status === 200) {
        const title = parentElement.firstElementChild.getElementsByClassName('label')[0];
        title.innerHTML = element.value;
    }
    parentElement.classList.remove('editing');
}

function getCurrentUserId() {
    const selectedUser = document.getElementsByClassName('ripple active')[0];
    return selectedUser.dataset.id;
}

function generateUserItem(user, isActive) {
    if (isActive) {
        return `<button class='ripple active' data-id=${user._id} onClick=selectUser(this)>${user.name}</button>`
    }
    return `<button class=ripple data-id=${user._id} onClick=selectUser(this)>${user.name}</button>`
}



function generateTodoItem(todoId, todoTitle, isCompleted) {
    return `<li ${isCompleted ? "class=completed" : ""} ondblclick="changeToModifiable(this)" onkeydown="onKeyTodoItem(event)">
              <div class="view" data-id=${todoId}">
                <input class="toggle" type="checkbox" onclick="toggleTodoItem(this)" />
                <label class="label">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  ${todoTitle}
                </label>
                <button class="destroy" onclick="deleteTodoItem(this)"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>`
}
