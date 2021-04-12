const baseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const $todoInput = document.querySelector(".new-todo");
$todoInput.addEventListener("keyup", onAddTodoItem);

let listCount;
let userId;

async function onUserCreateHandler() {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName.length >= 2) {
    const data = {
      name: userName
    }
    await fetch(baseURL + "/api/users", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    location.reload();
  } else {
    alert('이름은 2글자 이상이어야 합니다.');
  }
}

async function getUsers() {
  const userList = await fetch(baseURL + "/api/users", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
  addUserContent(userList);
}

function addUserContent(userList) {
  const userListContent = document.querySelector("#user-list");
  for(let i = 0; i < userList.length; i++) {
      const userButton = document.createElement("button");
      userButton.id = userList[i]._id;
      userButton.innerText = userList[i].name;
      userButton.classList.add("ripple");
      userButton.addEventListener('click', onUserHandler);
      userListContent.prepend(userButton);
  }
}

function onUserHandler(event) {
  document.querySelector(".active").classList.toggle("active");
  event.target.classList.toggle("active");
  document.querySelector("strong").innerText = event.target.innerText;
  userId = event.target.id;
  getSelectedUserTodo(event.target.id);
}

async function onUserDeleteHandler() {
  await fetch(baseURL + "/api/users/" + userId, {
    method: 'DELETE'
  }).then(alert('유저 삭제 완료'));
  location.reload();
  userId = null;
}

async function getSelectedUserTodo(userId) {
  await fetch(baseURL + '/api/users/' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
      .then(data => updateTodos(data));
}

function makeTodo(content) {
  return `<li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  ${content}
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value=${content} />
            </li>`;
}

async function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  if (event.key === "Enter" && todoTitle !== "") {
    await fetch(baseURL + '/api/users/' + userId + "/items", {
      method: 'POST',
      body: JSON.stringify({
        contents: todoTitle
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    await getSelectedUserTodo(userId);
    event.target.value = "";
  }
}

async function updateTodos(todo) {
  const todoListContent = document.querySelector('.todo-list');
  todoListContent.innerHTML = "";
  for(let i = 0; i < todo.todoList.length; i++) {
    let todoItem = makeTodo(todo.todoList[i].contents);
    todoListContent.insertAdjacentHTML('beforeend', todoItem);
  }
  setCount(todo.todoList.length);
}

function setCount(count) {
  const listContent = document.getElementsByClassName("todo-count")[0].childNodes[1];
  listContent.innerHTML = count;
  listCount = count;
}

getUsers();

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

const userDeleteButton = document.querySelector('.user-delete-button')
userDeleteButton.addEventListener('click', onUserDeleteHandler)