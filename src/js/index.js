import * as form from "./requestForm.js";

const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)
const userDeleteButton = document.querySelector('.user-delete-button')
userDeleteButton.addEventListener('click', onUserDeleteHandler)
const $userItem = document.querySelector(".user-list");
$userItem.addEventListener('click', selectUser);

let userInfo = new Map();

allUsers();

function allUsers() {
  fetch(BASE_URL + "/api/users", form.getUserListForm())
      .then(res => res.json())
      .then(
          users => renderUsers(users)
      );
}

function renderUsers(users) {
  const todoList = document.getElementById("user-list");
  for (let i = 0; i < users.length; i++) {
    todoList.insertAdjacentHTML("afterbegin", onAddUserItem(users[i].name));
    userInfo.set(users[i].name, users[i]._id);
  }
}

function onUserCreateHandler() {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if(!userName) {
    return;
  }
  if(userName.length < 2) {
    alert("2글자 이상이어야 합니다.")
    return;
  }

  const id = createUser(form.createUserForm(userName));
  userInfo.set(userName, id);

  const todoList = document.getElementById("user-list");
  todoList.insertAdjacentHTML("afterbegin", onAddUserItem(userName));
}

async function createUser(userForm) {
  const response = await fetch(BASE_URL + "/api/users", userForm)
      .then(res => res.json());
  return response._id;
}

function onUserDeleteHandler() {
  const user = document.querySelector(".active");
  const ans = confirm(user.textContent + "을 삭제하시겠습니까?");
  if(ans) {
    deleteUser(user.textContent);
    user.remove();
  }
}

async function deleteUser(userName) {
  const id = userInfo.get(userName);
  userInfo.delete(userName);
  await fetch(BASE_URL + "/api/users/" + id, form.deleteUserForm())
      .then(res => res.json());
}

function onAddUserItem(userName) {
  return ` <button class="ripple">${userName}</button> `;
}

function selectUser(event) {
  if(event.target.classList.contains("management")) {
    return;
  }
  const userName = active(event.target.closest("button"));
  userTodoList(userName);
}

function active(user) {
  const users = document.getElementsByClassName("active");
  for (let i = 0; i < users.length; i++) {
    users[i].classList.remove("active");
  }
  if(user) {
    user.classList.add("active");
    const userTitle =  document.getElementById("user-title-name");
    userTitle.textContent = user.textContent;
  }

  return user.textContent;
}

async function userTodoList(userName) {
  const userId = userInfo.get(userName);
  const res = await fetch(`${BASE_URL}/api/users/${userId}/items/`, form.getUserTodoListForm())
      .then(res => res.json());

  console.log(res.todoList);
}
