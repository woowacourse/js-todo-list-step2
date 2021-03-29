import * as todoList from "./todoList.js";

const userNameCountMin = 2;

const baseApiUrl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";
const userButtonTemplate = (name, id) => `<button class="ripple" id=${id}>${name}</button>`;
let selectedUserId = "";

let users = [];
const $userList = document.querySelector(".users");

export const loadData = async () => {
  const response = await fetch(baseApiUrl);
  const result = await response.json()

  users = result;
  if (selectedUserId === "") {
    selectedUserId = users[0]["_id"];
  }
}

export const updateTodoList = (id) => {
  selectedUserId = id;
  document.querySelector("button.active").classList.remove("active");
  document.getElementById(id).classList.add("active");
  todoList.updateTodoList(users.find(user => user["_id"] === id)["todoList"]);
}

export const updateUserList = () => {
  $userList.innerHTML = users.map(user => userButtonTemplate(user["name"], user["_id"])).join("");
  document.getElementById(selectedUserId).classList.add("active");
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

export const addUser = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (isValidName(userName)) {
    fetch(baseApiUrl, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({name: userName})
    }).then(() => {
      loadData().then(updateUserList)
    });
  }
}

export const deleteUser = () => {
  fetch(baseApiUrl + "/" + selectedUserId, {
    method: "DELETE"
  }).then(() => {
    selectedUserId = "";
    loadData().then(() => {
      updateUserList();
      console.log(selectedUserId);
      updateTodoList(selectedUserId);
    });
  });
}
