const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

const userName = document.querySelector("#user-title > span > strong");
const userList = document.getElementById("user-list");
const todoList = document.querySelector(".todo-list");
const userCreateButton = document.querySelector('.user-create-button');
const userDeleteButton = document.querySelector('.user-delete-button');
const todoInputWindow = document.querySelector('.new-todo');

var staticUserObj;

userList.addEventListener('click', function(e) {
  loadAllUserWithUpdate();
  if (e.target && e.target.nodeName == "BUTTON" && (!e.target.classList.contains("active"))) {
    var deactivate = document.querySelector(".active");
    deactivate.classList.toggle("active");
    e.target.classList.toggle("active");
    updateTodoListByUser(e.target.innerText);
  }
})

todoList.addEventListener('click', function (e) {
  if (e.target && e.target.nodeName == "INPUT" && e.target.classList.contains("toggle")) {
    var currentUser = getCurrentUserObj();
    var chosenTodo = (e.target.parentNode.getElementsByClassName("label")[0].innerText)
    for (let i = 0; i < currentUser.todoList.length; i++) {
      if (chosenTodo.includes(currentUser.todoList[i].contents)) {
        var userID = currentUser._id //현재 유저아이디
        var itemID = currentUser.todoList[i]._id // 아이템 아이디
        updateCompletion(userID, itemID, e.target.closest("li"));
        return;
      }
    }
  }

  if (e.target && e.target.nodeName == "BUTTON") {
    if (confirm("삭제하시겠습니까?")) {
      var currentUser = getCurrentUserObj();
      var chosenTodo = (e.target.parentNode.getElementsByClassName("label")[0].innerText)
      for (let i = 0; i < currentUser.todoList.length; i++) {
        if (chosenTodo.includes(currentUser.todoList[i].contents)) {
          var userID = currentUser._id //현재 유저아이디
          var itemID = currentUser.todoList[i]._id // 아이템 아이디
          deleteToDoList(userID, itemID, e.target.closest("li"));
          return;
        }
      }
    }
  }
})

function updateCompletion(userID, itemID, todoList) {
  fetch(API_URL + "/" + userID + "/items/" + itemID + "/toggle", { method: 'PUT' })
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then(post => {
      todoList.classList.toggle("completed");
    })
    .catch(error => {
      console.log(error);
      alert("서버와의 통신 실패!");
    })
  return;
}

function deleteToDoList(userID, itemID, todoList) {
  fetch(API_URL + "/" + userID + "/items/" + itemID, { method: 'DELETE' })
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then(post => {
      todoList.remove();
    })
    .catch(error => {
      console.log(error);
      alert("서버와의 통신 실패!");
    })
}

todoList.addEventListener('dblclick', function (e) {
  if (e.target && e.target.nodeName == "LABEL") {
    var chosenList = e.target.closest("li");
    chosenList.addEventListener('keydown', finishEditMode);
    chosenList.classList.toggle("editing");
  }
})

function finishEditMode(e) {
  var currentUser = getCurrentUserObj();
  var chosenTodo = (e.target.parentNode.getElementsByClassName("label")[0].innerText);
  var userID;
  var itemID;
  for (let i = 0; i < currentUser.todoList.length; i++) {
    if (chosenTodo.includes(currentUser.todoList[i].contents)) {
      userID = currentUser._id //현재 유저아이디
      itemID = currentUser.todoList[i]._id // 아이템 아이디
    }
  }

  if (e.key === "Escape") {
    var chosenList = e.target.closest("li");
    chosenList.removeAttribute('class');
    return;
  }

  if (e.key === "Enter") {
    var chosenList = e.target.closest("li");
    var changedText = chosenList.getElementsByClassName("edit")[0].value;
    chosenList.getElementsByClassName("edit")[0].value = changedText;
    var label = chosenList.getElementsByClassName("label")[0];
    label.childNodes[2].nodeValue = changedText;
    //서버요청!!!
    updateTodoItem(userID, itemID, changedText);
    chosenList.removeAttribute('class');
  }
}

function updateTodoItem(userID, itemID, changedText) {
  const updateTodoItem = {
    contents: changedText
  }

  const changeTodo = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateTodoItem)
  }

  fetch(API_URL + "/" + userID + "/items/" + itemID, changeTodo)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then(post => {
      loadAllUserWithUpdate();
    })
    .catch(error => {
      console.log(error);
      alert("서버와의 통신 실패!");
    })
}

function updateTodoListByUser(userNameCalled) {
  for (let i = 0; i < staticUserObj.length; i++) {
    if (staticUserObj[i].name == userNameCalled) {
      todoList.innerHTML = "";
      userName.innerText = staticUserObj[i].name;
      appendTodoList(staticUserObj[i].todoList);
    }
  }
}

function appendTodoList(userTodoList) {
  console.log(userTodoList)
  for (let i = 0; i < userTodoList.length; i++) {
    var list = document.createElement("li");
    if (userTodoList[i].isCompleted) {
      list.classList.add("completed");
    }
    list.innerHTML = 
              `<div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  ${userTodoList[i].contents}
                </label>
                <button class="destroy"></button>
              </div>
      <input class="edit" value=${userTodoList[i].contents} />`;
    todoList.appendChild(list);
  }
}

function loadAllUserWithUpdate() {
  fetch(API_URL)
    .then(data => {
      return data.json()
    })
    .then(data => {
      var userObj = data;
      staticUserObj = userObj;
    });
}

function loadAllUserFromServer() {
  fetch(API_URL)
    .then(data => {
      return data.json()
    })
    .then(data => {
      var userObj = data;
      staticUserObj = userObj;
      showAllUser(userObj);
    });
}

function showAllUser(userObj) {
  for (let i = 0; i < userObj.length; i++) {
    console.log(userObj[i])
    showSingleUser(i, userObj[i]);
  }
}

function showSingleUser(index, userObj) {
  var user = document.createElement("button");
  if (index === 0) {
    appendTodoList(userObj);
    userName.innerText = userObj.name;
    user.setAttribute("class", "ripple active");
  } else {
    user.setAttribute("class", "ripple");
  }
  user.innerText = userObj.name;
  userList.insertBefore(user, userCreateButton);
}

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName.length >= 2) {
    const newUser = {
      name: userName,
    }

    const postOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }

    saveNewUserToServer(postOption, userName);
  
  } else {
    alert("사용자 이름은 최소 2자 이상이여야 합니다.");
  }
}

function saveNewUserToServer(postOption, userName) {
  fetch(API_URL, postOption)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then(post => {
      console.log(post);
      staticUserObj.push(post);
      addNewUserToUI(userName);
    })
    .catch(error => {
      console.log(error);
      alert("서버와의 통신 실패!");
    })
}

function addNewUserToUI(userName) {
  var activeUser = document.getElementsByClassName("active")[0];
  activeUser.removeAttribute("class");
  activeUser.setAttribute("class", "ripple");

  var user = document.createElement("button");
  user.setAttribute("class", "ripple active");
  user.innerText = userName;
  userList.insertBefore(user, userCreateButton);
}

const onUserDeleteHandler = () => {
  var userToBeDeleted = document.getElementsByClassName("active")[0];
  if (confirm(userToBeDeleted.innerHTML + "를 삭제하시겠습니까?")) {
    for (let i = 0; i < staticUserObj.length; i++) {
      if (staticUserObj[i].name == userToBeDeleted.innerHTML) {
        deleteUser("/"+staticUserObj[i]._id, userToBeDeleted);
      }
    }
  }
}

function deleteUser(userID, userToBeDeleted) {
  const deleteOption = {
    method: 'DELETE',
  }

  fetch(API_URL + userID, deleteOption)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then(post => {
      console.log(post);
      userToBeDeleted.remove();
    })
    .catch(error => {
      console.log(error);
      alert("서버와의 통신 실패!");
    })
}

userCreateButton.addEventListener('click', onUserCreateHandler);
userDeleteButton.addEventListener('click', onUserDeleteHandler);

todoInputWindow.addEventListener('keydown', function(e) {
  if (e.key == "Enter" && e.target.value.length >= 2) {
    var currentUserObj = getCurrentUserObj();
    var newToDoList = e.target.value;

    const userWithUpdatedToDo = {
      contents: newToDoList
    }

    const postOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userWithUpdatedToDo)
    }
    console.log(postOption)
    saveNewToDoToServer(postOption, currentUserObj);
    todoInputWindow.value = "";
    console.log(todoInputWindow);
  } 
});

function saveNewToDoToServer(postOption, userObj) {
  fetch(API_URL + "/" + userObj._id + "/items/", postOption)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then(post => {
      userObj.todoList.push(post);
      updateTodoListByUser(userObj.name);
    })
    .catch(error => {
      console.log(error);
      alert("서버와의 통신 실패!");
    })
}

function getCurrentUserObj() {
  var currentUser = document.querySelector(".active");
  var userName = currentUser.innerText;
  for (let i = 0; i < staticUserObj.length; i++) {
    if (staticUserObj[i].name === userName) {
      return staticUserObj[i];
    }
  }
}

loadAllUserFromServer();