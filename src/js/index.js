import * as userList from "./userList.js"
import * as todoList from "./todoList.js"

const userNameCountMin = 2;
const baseApiUrl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";
let users = [];
let selectedUserId = "";

const loadData = async () => {
  const response = await fetch(baseApiUrl);
  users = await response.json();

  if (selectedUserId === "") {
    selectedUserId = users[0]["_id"];
  }
}

const getTodosById = (id) => {
  return users.find(user => user["_id"] === id)["todoList"];
}

const getUserById = (id) => {
  return users.find(user => user["_id"] === id);
}

const isValidName = (name) => {
  if (name === null) {
    return false;
  }
  if (name.length < userNameCountMin) {
    alert(userNameCountMin + "자 이상의 이름을 입력해주세요.");
    return false;
  }
  return true;
}

const onUserCreateHandler = async () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (isValidName(userName)) {
    const response = await fetch(baseApiUrl, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({name: userName})
    });
    const newUser = await response.json();
    users.push(newUser);
    userList.updateUserList(users, selectedUserId);
  }
}

function onUserDeleteHandler() {
  const idToRemove = selectedUserId;
  users = users.filter(user => user["_id"] !== selectedUserId);
  selectedUserId = users[0]["_id"];
  userList.updateUserList(users, selectedUserId);
  todoList.updateTodoList(getTodosById(selectedUserId));
  fetch(baseApiUrl + "/" + idToRemove, {
    method: "DELETE"
  }).then();
}

const onSelectUserHandler = (event) => {
  if (event.target && event.target.tagName === "BUTTON") {
    selectedUserId = event.target.id;
    userList.updateUserList(users, selectedUserId);
    todoList.updateTodoList(getTodosById(selectedUserId));
  }
}

const onInputNewTodoHandler = async (event) => {
  if (event.key === "Enter" && event.target.value) {
    if (event.target.value.length < userNameCountMin) {
      alert("내용은 2자 이상이어야 합니다.");
      return;
    }
    const response = await fetch(baseApiUrl + "/" + selectedUserId + "/items", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({"contents": event.target.value})
    })
    const result = await response.json();
    event.target.value = "";
    getTodosById(selectedUserId).push(result);
    todoList.updateTodoList(getTodosById(selectedUserId));
  }
}

const onCompleteHandler = (event) => {
  if (event.target && event.target.classList.contains("toggle")) {
    const selectedTodoId = event.target.closest("li").id;
    const todosById = getTodosById(selectedUserId);
    const toggledTodoIndex = todosById.findIndex(
        todo => todo["_id"] === selectedTodoId);
    todosById[toggledTodoIndex]["isCompleted"] = !todosById[toggledTodoIndex]["isCompleted"];
    todoList.updateTodoList(todosById);

    fetch(baseApiUrl + "/" + selectedUserId + "/items/" + selectedTodoId
        + "/toggle", {
      method: "PUT"
    }).then();
  }
}

const onTodoDeleteHandler = (event) => {
  if (event.target && event.target.classList.contains("destroy")) {
    const selectedTodoId = event.target.closest("li").id;
    getUserById(selectedUserId)["todoList"] =
        getUserById(selectedUserId)["todoList"]
        .filter(todo => todo["_id"] !== selectedTodoId);
    todoList.updateTodoList(getTodosById(selectedUserId));

    fetch(baseApiUrl+"/"+selectedUserId+"/items/"+selectedTodoId, {
      method: "DELETE"
    }).then();
  }
}

document.querySelector('.user-create-button').addEventListener('click',
    onUserCreateHandler)
document.querySelector(".user-delete-button").addEventListener('click',
    onUserDeleteHandler)
document.querySelector(".users").addEventListener('click', onSelectUserHandler);
document.querySelector(".new-todo").addEventListener("keyup",
    onInputNewTodoHandler);
document.querySelector(".main").addEventListener("click", onCompleteHandler);

document.querySelector(".main").addEventListener("click", onTodoDeleteHandler);

window.onload = () => {
  loadData().then(() => {
    userList.updateUserList(users, selectedUserId);
    todoList.updateTodoList(getTodosById(selectedUserId));
  });
}