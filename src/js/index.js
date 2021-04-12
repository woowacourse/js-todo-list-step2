const baseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const todoInput = document.querySelector(".new-todo");
const userCreateButton = document.querySelector('.user-create-button');
const userDeleteButton = document.querySelector('.user-delete-button');
const $todoList = document.querySelector(".todo-list");

todoInput.addEventListener("keyup", onAddTodoItem);
userCreateButton.addEventListener('click', onUserCreateHandler);
userDeleteButton.addEventListener('click', onUserDeleteHandler);

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

function makeTodo(content, id, liClass) {
  let val = "";
  if(liClass === "completed") {
    val = "checked"
  }
  return `<li class=${liClass}>
              <div class="view" id=${id}>
                <input class="toggle" onclick="onToggleTodoItem(event)" type="checkbox" ${val}/>
                <label class="label" ondblclick="onDoubleClickedItem(event)">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  ${content}
                </label>
                <button class="destroy" onclick="onClickDeletedItem(event)"></button>
              </div>
              <input class="edit" value=${content} />
            </li>`;
}

async function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  if (event.key === "Enter" && todoTitle !== "") {
    if (todoTitle.length < 2) {
      alert('todo의 내용은 2글자 이상이어야 합니다.');
    } else {
      fetch(baseURL + '/api/users/' + userId + "/items", {
        method: 'POST',
        body: JSON.stringify({
          contents: todoTitle
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      event.target.value = "";
      await getSelectedUserTodo(userId);
    }
  }
}

async function onToggleTodoItem(event) {
  if(event.target.value === "on"){
    const itemId = event.target.closest("div").id;
    await fetch(baseURL + '/api/users/' + userId + "/items/" + itemId + "/toggle", {
      method: 'PUT',
    }).then(res => res.json());
    event.target.closest("input").classList.toggle("checked");
    event.target.closest("li").classList.toggle("completed");
  }
}

function onDoubleClickedItem(event) {
  let updatedLabel = event.target;
  const itemId = updatedLabel.closest('div').id;
  const updatedLi = updatedLabel.closest('li');
  updatedLi.classList.add("editing");

  let input = updatedLi.querySelector(".edit");
  input.addEventListener('keydown', async function (innerEvent) {
    if (innerEvent.key === 'Esc' || innerEvent.key === 'Escape') {
      updatedLi.classList.remove("editing");
    }
    if (innerEvent.key === 'Enter') {
      const result = await fetch(baseURL + '/api/users/' + userId + "/items/" + itemId, {
        method: 'PUT',
        body: JSON.stringify({
          contents: input.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      updatedLi.classList.remove("editing");
      await getSelectedUserTodo(userId);
    }
  });
}

async function onClickDeletedItem(event) {
  const itemId = event.target.closest("div").id;
  await fetch(baseURL + '/api/users/' + userId + "/items/" + itemId, {
    method: 'DELETE',
  }).then(res => res.json())
  await getSelectedUserTodo(userId);
}

async function updateTodos(todo) {
  const todoListContent = document.querySelector('.todo-list');
  todoListContent.innerHTML = "";
  for(let i = 0; i < todo.todoList.length; i++) {
    let toggled = "";
    if(todo.todoList[i].isCompleted) {
      toggled = "completed"
    }
    let todoItem = makeTodo(todo.todoList[i].contents, todo.todoList[i]._id, toggled);
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

let $all = document.querySelector(".all");
let $completed = document.querySelector(".completed");
let $notCompleted = document.querySelector(".active");
let $deleteAll = document.querySelector(".clear-completed");
$all.addEventListener('click', showAllItems);
$completed.addEventListener('click', showCompletedItems);
$notCompleted.addEventListener('click', showNotCompletedItems);
$deleteAll.addEventListener('click', deleteAll);

function showAllItems() {
  let count = 0;
  const items = $todoList.querySelectorAll("li");
  for(let item of items) {
    item.style.display = "block";
      count += 1;
  }
  setCount(count);
}

function showCompletedItems() {
  $completed.classList.toggle("selected");
  if($all.classList.contains("selected")) {
    $all.classList.toggle("selected");
  }
  if($notCompleted.classList.contains("selected")) {
    $notCompleted.classList.toggle("selected");
  }

  let count = 0;
  const items = $todoList.querySelectorAll("li");
  for(let item of items) {
    if(item.classList.contains("completed")) {
      item.style.display = "block";
      count += 1;
    } else {
      item.style.display = "none";
    }
  }
  setCount(count);
}

function showNotCompletedItems() {
  $notCompleted.classList.toggle("selected");
  if($all.classList.contains("selected")) {
    $all.classList.toggle("selected");
  }
  if($completed.classList.contains("selected")) {
    $completed.classList.toggle("selected");
  }

  let count = 0;
  const items = $todoList.querySelectorAll("li");
  for(let item of items) {
    if(item.classList.contains("completed")) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
      count += 1;
    }
  }
  setCount(count);
}

async function deleteAll() {
  await fetch(baseURL + '/api/users/' + userId + "/items/", {
    method: 'DELETE',
  }).then(res => res.json());
  await getSelectedUserTodo(userId);
}
