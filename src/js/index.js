const userCreateButton = document.querySelector('.user-create-button');
const userList = document.getElementById('user-list');
const todoList = document.querySelector('.todo-list');
const userDeleteButton = document.querySelector('.user-delete-button');
const todoInput = document.querySelector('.new-todo');
const todoAllClearButton = document.querySelector(".clear-completed");

userCreateButton.addEventListener('click', onUserCreateHandler);
userList.addEventListener('click', onUserSelectHandler);
userDeleteButton.addEventListener('click', onUserDeleteHandler);
todoInput.addEventListener('keyup', onAddTodoHandler);
todoAllClearButton.addEventListener('click', onAllClearTodoHandler);

loadUserList();

async function loadUserList() {
  await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users")
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
        userList.children.add
        userList.insertBefore(buttonElement, userList.children[userList.children.length - 2]);
      }
      document.querySelector(".user-name").innerText = data[0].name;
      userList.children[0].classList.toggle("active");
    });
}

async function onUserCreateHandler() {
  const userName = prompt("추가하고 싶은 이름을 입력해 주세요.");
  if (userName.length < 2) {
    alert("2자 이상의 이름을 입력해 주세요!");
    return;
  }

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

  await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users", option)
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
      userList.insertBefore(buttonElement, userList.children[userList.children.length - 2]);
    })
    .catch(error => {
      console.log(error)
    });

};

async function onUserSelectHandler(event) {
  const item = event.target.closest('button');
  if (item === null || item.id === "") {
    return;
  }
  todoList.innerHTML = '';

  for (let i = 0; i < userList.children.length; i++) {
    if (userList.children[i].classList.contains("active")) {
      userList.children[i].classList.toggle("active");
    }
  }

  item.classList.toggle("active");
  document.querySelector(".user-name").innerText = item.innerText;

  await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + item.id + "/items")
    .then(data => {
      if (!data.ok) {
        return new Error(data.status);
      }
      return data.json();
    })
    .then(data => {
      if (data.length === 0) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        todoList.insertAdjacentHTML('beforeend', renderTodoItemTemplate(data[i]._id, data[i].contents));
        if (data[i].isCompleted) {
          todoList.children[i].classList.toggle("completed");
        }
      }
    });
}

async function onUserDeleteHandler() {
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

  if (!confirm(document.querySelector(".user-name").innerText + "을 삭제하시겠습니까?")) {
    return;
  }

  await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + deleteUser.id, {
    method: 'DELETE',
  })
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status)
      }
      return data.json()
    });
  deleteUser.remove();
}

function renderTodoItemTemplate(id, title) {
  return ` <li id=${id}>
  <div class="view">
    <input class="toggle" onclick="onToggleTodoItem(event)" type="checkbox" />
    <label class="label" ondblclick="onEditItem(event)">${title}</label>
    <button class="destroy" onclick="onDeleteItem(event)"></button>
  </div>
  <input class="edit" value=${title} />
</li>`;
}

async function onToggleTodoItem(event) {
  let selectedUser = "";
  for (let i = 0; i < userList.children.length; i++) {
    if (userList.children[i].classList.contains("active")) {
      selectedUser = userList.children[i];
      break;
    }
  }

  if (selectedUser === "") {
    alert("todoItem을 Completed 상태로 만들 유저를 선택해 주세요.");
    return;
  }

  const item = event.target;
  await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + selectedUser.id + "/items/" +
    item.parentElement.parentElement.id + "/toggle", {
    method: 'PUT'
  })
    .then(data => {
      if (!data.ok) {
        return new Error(data.status);
      }
      item.parentElement.parentElement.classList.toggle("completed")
      return data.json();
    })
}

function onEditItem(event) {
  let selectedUser = "";
  for (let i = 0; i < userList.children.length; i++) {
    if (userList.children[i].classList.contains("active")) {
      selectedUser = userList.children[i];
      break;
    }
  }

  if (selectedUser === "") {
    alert("todoItem을 수정할 유저를 선택해 주세요.");
    return;
  }

  const item = event.target;
  item.parentElement.parentElement.classList.add("editing");

  const input = item.parentElement.parentElement.children[1];
  input.addEventListener('keyup', async function (e) {
    if (e.key == 'Esc' || e.key == 'Escape') {
      item.parentElement.parentElement.classList.remove("editing");
    }

    if (e.key == 'Enter') {
      if (input.value.length < 2) {
        alert("2자 이상의 할 일을 입력해 주세요!");
        item.parentElement.parentElement.classList.remove("editing");
        return;
      }

      const newContent = {
        contents: input.value
      };

      const option = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContent)
      };

      await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + selectedUser.id +
        "/items/" + item.parentElement.parentElement.id, option)
        .then(data => {
          if (!data.ok) {
            return new Error(data.status);
          }
          return data.json();
        })
        .then(data => {
          item.innerText = data.contents;
          item.parentElement.parentElement.classList.remove("editing");
        })
    }
  })
}

async function onDeleteItem(event) {
  let selectedUser = "";
  for (let i = 0; i < userList.children.length; i++) {
    if (userList.children[i].classList.contains("active")) {
      selectedUser = userList.children[i];
      break;
    }
  }

  if (selectedUser === "") {
    alert("todoItem을 삭제할 유저를 선택해 주세요.");
    return;
  }

  const item = event.target;
  await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + selectedUser.id + "/items/" +
    item.parentElement.parentElement.id, {
    method: 'DELETE'
  })
    .then(data => {
      if (!data.ok) {
        return new Error(data.status);
      }
      item.parentElement.parentElement.remove();
      return data.json();
    })
}

async function onAddTodoHandler(event) {
  const todo = event.target.value;

  if (event.key !== 'Enter') {
    return;
  }

  let selectedUser = "";
  for (let i = 0; i < userList.children.length; i++) {
    if (userList.children[i].classList.contains("active")) {
      selectedUser = userList.children[i];
      break;
    }
  }

  if (selectedUser === "") {
    alert("todoItem을 추가할 유저를 선택해 주세요.");
    return;
  }

  if (todo.length < 2) {
    alert("2자 이상의 할 일을 입력해 주세요!");
    return;
  }

  const newTodo = {
    contents: todo
  };

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  };

  await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + selectedUser.id + "/items", option)
    .then(data => {
      if (!data.ok) {
        return new Error(data.status);
      }
      return data.json();
    })
    .then(data => {
      todoList.insertAdjacentHTML('beforeend', renderTodoItemTemplate(data._id, data.contents));
    })
  event.target.value = "";
}

async function onAllClearTodoHandler() {
  let selectedUser = "";
  for (let i = 0; i < userList.children.length; i++) {
    if (userList.children[i].classList.contains("active")) {
      selectedUser = userList.children[i];
      break;
    }
  }

  if (selectedUser === "") {
    alert("todoItem을 모두 삭제할 유저를 선택해 주세요.");
    return;
  }

  await fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + selectedUser.id + "/items/", {
    method: 'DELETE'
  })
    .then(data => {
      if (!data.ok) {
        return new Error(data.status);
      }
      todoList.innerHTML = '';
      return data.json();
    })
}