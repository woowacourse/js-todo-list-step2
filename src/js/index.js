const BASIC_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
const USERS = "/api/users/";

const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


loadUsers();
async function loadUsers() {
    const usersRes = await fetch(BASIC_URL + USERS)
    const users = await usersRes.json();
    const user_list = document.getElementById('user-list')
    user_list.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        user_list.innerHTML += generateUserItem(users[i]);
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
    const userRes = await fetch(`${BASIC_URL}${USERS}${userId}`)
    const user = await userRes.json();
    const todoList = user.todoList

    const view_todo_list = document.getElementsByClassName('todo-list')[0];
    view_todo_list.innerHTML = ''
    for (let i = 0; i < todoList.length; i++) {
        view_todo_list.innerHTML += generateTodoItem(todoList[i].contents)
    }
}


function generateUserItem(user) {
    return `<button class=ripple data-id=${user._id} onClick=selectUser(this)>${user.name}</button>`
}

function generateTodoItem(todoTitle) {
    return `<li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  ${todoTitle}
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>`
}
