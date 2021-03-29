const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

const userList = document.getElementById("user-list");
const userCreateButton = document.querySelector('.user-create-button')
const userDeleteButton = document.querySelector('.user-delete-button')

var staticUserObj;

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
    showSingleUser(i, userObj[i].name);
  }
}

function showSingleUser(index, name) {
  var user = document.createElement("button");
  if (index === 0) {
    user.setAttribute("class", "ripple active");
  } else {
    user.setAttribute("class", "ripple");
  }
  user.innerText = name;
  userList.insertBefore(user, userCreateButton);
}

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName.length >= 2) {
    const newUser = {
      _id: "testID",
      name: userName,
      todoList: []
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
loadAllUserFromServer();