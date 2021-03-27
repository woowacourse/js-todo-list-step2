const userCreateButton = document.querySelector('.user-create-button');
const userList = document.getElementById("user-list");
userCreateButton.addEventListener('click', onUserCreateHandler);
userList.addEventListener('click', onUserSelectHandler);

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