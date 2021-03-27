const userCreateButton = document.querySelector('.user-create-button');
const userList = document.getElementById('user-list');
const userDeleteButton = document.querySelector('.user-delete-button');

userCreateButton.addEventListener('click', onUserCreateHandler);
userList.addEventListener('click', onUserSelectHandler);
userDeleteButton.addEventListener('click', onUserDeleteHandler);

loadUserList();

function loadUserList() {
  fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users")
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status)
      }
      return data.json()
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const buttonElement = document.createElement('button');
        buttonElement.className = "ripple";
        buttonElement.id = data[i]._id;
        buttonElement.innerText = data[i].name;
        userList.insertBefore(buttonElement, userList.children[1]);
      }
    });
}

function onUserCreateHandler() {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  const newUser = {
    name: userName
  };

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  };

  fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users", option)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status)
      }
      return data.json()
    })
    .then(data => {
      const buttonElement = document.createElement('button');
      buttonElement.className = "ripple";
      buttonElement.id = data._id;
      buttonElement.innerText = data.name;
      userList.insertBefore(buttonElement, userCreateButton);
    })
    .catch(error => {
      console.log(error)
    });

};

function onUserSelectHandler(event) {
  const item = event.target.closest('button');
  if (item === null || (!item.classList.contains("basic") && item.id === "")) {
    return;
  }

  for (let i = 0; i < userList.children.length; i++) {
    if (userList.children[i].classList.contains("active")) {
      userList.children[i].classList.toggle("active");
    }
  }

  item.classList.toggle("active");
  document.querySelector(".user-name").innerText = item.innerText;
}

function onUserDeleteHandler() {
  let deleteUser = "";
  for (let i = 0; i < userList.children.length; i++) {
    if (userList.children[i].classList.contains("active")) {
      deleteUser = userList.children[i];
      break;
    }
  }

  if (deleteUser === "") {
    alert("삭제할 유저를 선택해 주세요.");
    return;
  }

  if (deleteUser.classList.contains("basic")) {
    alert("j.on 유저는 삭제할 수 없습니다.");
    return;
  }

  if (!confirm(document.querySelector(".user-name").innerText + "을 삭제하시겠습니까?")) {
    return;
  }

  fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + deleteUser.id, {
    method: 'DELETE',
  })
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status)
      }
      return data.json()
    });
  deleteUser.remove();
  document.querySelector(".user-name").innerText = "j.on";
  document.querySelector(".basic").classList.toggle("active");
}