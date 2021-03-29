const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

const userList = document.getElementById("user-list");
const userCreateButton = document.querySelector('.user-create-button')

function loadAllUserFromServer() {
  fetch(API_URL)
    .then(data => {
      return data.json()
    })
    .then(data => {
      var userObj = data;
      showAllUser(userObj);
    });
}

function showAllUser(userObj) {
  for (let i = 0; i < userObj.length; i++) {
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
    console.log(postOption)

    saveNewUserToServer(postOption);
    //async처리...? 바로되는데?
    var activeUser = document.getElementsByClassName("active")[0];
    activeUser.removeAttribute("class");
    activeUser.setAttribute("class", "ripple");

    var user = document.createElement("button");
    user.setAttribute("class", "ripple active");
    user.innerText = userName;
    userList.insertBefore(user, userCreateButton);

  } else {
    alert("사용자 이름은 최소 2자 이상이여야 합니다.");
  }
}


function saveNewUserToServer(postOption) {
  fetch(API_URL, postOption)
  .then(data => {
    if (!data.ok) {
      throw new Error(data.status);
    }
    return data.json();
  })
  .then(post => {
    console.log(post);
  })
  .catch(error => {
    console.log(error);
    alert("서버와의 통신 실패!");
  })
}

userCreateButton.addEventListener('click', onUserCreateHandler)

loadAllUserFromServer();