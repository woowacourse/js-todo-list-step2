import * as userList from "./userList.js"
import * as todoList from "./todoList.js"

const userNameCountMin = 2;
const baseApiUrl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";
let users = [];
let selectedUserId = "";

let priority = {
  "0": "NONE",
  "1": "FIRST",
  "2": "SECOND"
}

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

async function onUserDeleteHandler() {
  const idToRemove = selectedUserId;
  users = users.filter(user => user["_id"] !== selectedUserId);
  selectedUserId = users[0]["_id"];
  userList.updateUserList(users, selectedUserId);
  todoList.updateTodoList(getTodosById(selectedUserId));
  await fetch(baseApiUrl + "/" + idToRemove, {
    method: "DELETE"
  });
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
    todoList.addLoadingTodo();
    const valueToAdd = event.target.value;
    event.target.value = "";
    const response = await fetch(baseApiUrl + "/" + selectedUserId + "/items", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({"contents": valueToAdd})
    })
    const result = await response.json();
    getTodosById(selectedUserId).push(result);
    todoList.updateTodoList(getTodosById(selectedUserId));
  }
}

const onCompleteHandler = async (event) => {
  if (event.target && event.target.classList.contains("toggle")) {
    const selectedTodoId = event.target.closest("li").id;
    const todosById = getTodosById(selectedUserId);
    const toggledTodoIndex = todosById.findIndex(
        todo => todo["_id"] === selectedTodoId);
    todosById[toggledTodoIndex]["isCompleted"] = !todosById[toggledTodoIndex]["isCompleted"];
    todoList.updateTodoList(todosById);

    await fetch(baseApiUrl + "/" + selectedUserId + "/items/" + selectedTodoId
        + "/toggle", {
      method: "PUT"
    });
  }
}

const onTodoDeleteHandler = async (event) => {
  if (event.target && event.target.classList.contains("destroy")) {
    const selectedTodoId = event.target.closest("li").id;
    getUserById(selectedUserId)["todoList"] =
        getUserById(selectedUserId)["todoList"]
        .filter(todo => todo["_id"] !== selectedTodoId);
    todoList.updateTodoList(getTodosById(selectedUserId));

    await fetch(baseApiUrl + "/" + selectedUserId + "/items/" + selectedTodoId,
        {
          method: "DELETE"
        });
  }
}

const onEditTodoHandler = (event) => {
  if (event.target && event.target.classList.contains("label")) {
    const selectedRow = event.target.closest("li");
    selectedRow.setAttribute("class", "editing");
  }
}

const onFinishToEditTodoHandler = async ({target, key}) => {
  if (target.value && key === "Enter") {
    if (target.value.length < userNameCountMin) {
      alert("내용은 2자 이상이어야 합니다.");
      return;
    }
    const selectedTodoId = target.closest("li").id;
    getTodosById(selectedUserId).find(
        todo => todo["_id"] === selectedTodoId)["contents"] = target.value;
    todoList.updateTodoList(getTodosById(selectedUserId));
    await fetch(baseApiUrl + "/" + selectedUserId + "/items/" + selectedTodoId,
        {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({"contents": target.value})
        });
    return;
  }
  if (key === "Escape") {
    const selectedRow = target.closest("li");
    selectedRow.classList.remove("editing");
    todoList.updateTodoList(getTodosById(selectedUserId));
  }
}

const onSelectChip = async (event) => {
  if (event.target.value !== "0") {
    const selectedTodoId = event.target.closest("li").id;
    getTodosById(selectedUserId).find(todo => todo["_id"]
        === selectedTodoId)["priority"] = priority[event.target.value];
    todoList.updateTodoList(getTodosById(selectedUserId));
    await fetch(baseApiUrl + "/" + selectedUserId + "/items/" + selectedTodoId
        + "/priority", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({"priority": priority[event.target.value]})
    });
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
document.querySelector(".main").addEventListener("dblclick", onEditTodoHandler);
document.querySelector(".main").addEventListener("keyup",
    onFinishToEditTodoHandler);
document.querySelector(".main").addEventListener("change", onSelectChip);

window.onload = async () => {
  await loadData()
  userList.updateUserList(users, selectedUserId);
  todoList.updateTodoList(getTodosById(selectedUserId));
}