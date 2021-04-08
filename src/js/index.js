const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';
const USER_LIST = document.querySelector('#user-list');
const TODO_LIST = document.querySelector('.todo-list');

window.onload = () => {
  const userCreateButton = document.querySelector('.user-create-button')
  userCreateButton.addEventListener('click', onUserCreateHandler)

  const userDeleteButton = document.querySelector('.user-delete-button')
  userDeleteButton.addEventListener('click', onUserDeleteHandler);

  callGetUsersAPI();
}

const onUserCreateHandler = () => {
  const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
  if (userName.length < 2) {
    alert('이름은 최소 2글자 이상이여야 합니다.');
    return;
  }
  callAddUserAPI(userName);
}

const onUserDeleteHandler = () => {
  const user = getActiveUser();
  if (user === undefined) {
    alert('선택된 유저가 없습니다.');
    return;
  }
  const isDelete = confirm(user.getAttribute('data-name') + ' 을(를) 삭제하시겠습니까?');
  if (isDelete === true) {
    callDeleteUserAPI(user);
  }
}

function getActiveUser() {
  for (const user of USER_LIST.children) {
    if (user.getAttribute('data-active') == 'true') {
      return user;
    }
  }
}

function getOption(methodType, bodyData) {
  return {
      method: methodType,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
  };
}

function callGetUsersAPI() {
  fetch(API_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('유저 정보 얻기 실패');
    }
    return response.json();
  })
  .then(addUsers)
  .catch((error => {
    console.log(error)
  }))
}

function addUsers(response) {
  for (const user of response) {
    addUser(user);
  }
}

function addUser(user) {
  const userListItem = document.createElement('user-list-item');
    userListItem.setAttribute('key', user['_id']);
    userListItem.setAttribute('data-_id', user['_id']);
    userListItem.setAttribute('data-name', user['name']);
    userListItem.setAttribute('data-todolist', user['todoList']);
    userListItem.setAttribute('data-active', false);

    const userListItemButton = document.createElement('button');
    userListItemButton.className += 'ripple';
    userListItemButton.setAttribute('data-id', user['_id']);
    userListItemButton.setAttribute('data-action', 'selectUser');
    userListItemButton.setAttribute('selectuser', 'click');
    userListItemButton.textContent = user['name'];
    userListItemButton.addEventListener('click', userListItemButtonEvent)
    userListItem.appendChild(userListItemButton);

    USER_LIST.appendChild(userListItem);
}

function userListItemButtonEvent(event) {
  clearButtonData();
  clearTodoList();
  event.target.parentNode.setAttribute('data-active', true);
  event.target.classList.add("active");
  callGetUserAPI(event);
}

function clearButtonData() {
  for (const userItem of USER_LIST.children) {
    userItem.setAttribute('data-active', false);
    userItem.firstChild.classList.remove("active");
  }
}

function clearTodoList() {
  while (TODO_LIST.children.length !== 0) {
    TODO_LIST.removeChild(TODO_LIST.firstChild);
  }
}

function callGetUserAPI(event) {
  const userId = event.target.getAttribute('data-id');
  fetch(API_URL+'/'+userId)
  .then((response) => {
    if (!response.ok) {
      throw new Error('유저 정보 얻기 실패');
    }
    return response.json();
  })
  .then(addTodoList)
  .catch((error => {
    console.log(error)
  }))
}

function addTodoList(response) {
  for (const todo of response['todoList']) {
    
    const todoListItem = document.createElement('todo-list-item');
    todoListItem.setAttribute('key', todo['_id']);
    todoListItem.setAttribute('data-_id', todo['_id']);
    todoListItem.setAttribute('data-contents', todo['contents']);
    todoListItem.setAttribute('data-contents', todo['isCompleted']);
    todoListItem.setAttribute('data-priority', todo['priority']);

    const todoListItemList = document.createElement('li');
    todoListItemList.setAttribute('data-id', todo['_id']);

    const todoListItemDiv = document.createElement('div');
    todoListItemDiv.className = 'view';

    const todoListItemInput = document.createElement('input');
    todoListItemInput.className = 'toggle';
    todoListItemInput.type = 'checkbox';
    todoListItemInput.setAttribute('data-action', 'toggleTodo');
    todoListItemInput.setAttribute('toggletodo', 'click');

    const label = document.createElement('label');
    label.className = 'label';
    label.setAttribute('data-action', 'toggleEditingTodo');
    label.setAttribute('toggleeditingtodo', 'dbclick');
    label.textContent = todo['contents'];

    if (todo['priority'] === 'NONE') {
      const todoListItemSelect = document.createElement('select');
      todoListItemSelect.className = 'chip select';
      todoListItemSelect.setAttribute('data-action', 'selectPriority');
      todoListItemSelect.setAttribute('selectpriority', 'change');

      const noneOption = document.createElement('option');
      noneOption.value = 'NONE';
      noneOption.textContent = '순위';
      noneOption.toggleAttribute('select');

      const firstOption = document.createElement('option');
      firstOption.value = 'FIRST';
      firstOption.textContent = '1순위';

      const secondOption = document.createElement('option');
      secondOption.value = 'SECOND';
      secondOption.textContent = '2순위';

      todoListItemSelect.appendChild(noneOption);
      todoListItemSelect.appendChild(firstOption);
      todoListItemSelect.appendChild(secondOption);

      label.prepend(todoListItemSelect);
    } else {
      const todoListItemSpan = document.createElement('span');
      todoListItemSpan.className = 'chip';
      if (todo['priority'] === 'FIRST') {
        todoListItemSpan.classList.add('primary')
        todoListItemSpan.textContent = '1순위';
      } else {
        todoListItemSpan.classList.add('secondary')
        todoListItemSpan.textContent = '2순위';
      }
      label.prepend(todoListItemSpan);
    }

    todoListItemDiv.appendChild(todoListItemInput);
    todoListItemDiv.appendChild(label);
    todoListItemList.appendChild(todoListItemDiv);
    todoListItem.appendChild(todoListItemList);
    TODO_LIST.appendChild(todoListItem);
  }
}

function callAddUserAPI(userName) {
  const requestBody = {
    'name': userName,
  }
  const option = getOption('POST', requestBody);
  fetch(API_URL, option)
  .then((response) => {
    if (!response.ok) {
      throw new Error('유저 추가 실패');
    }
    return response.json();
  })
  .then((response) => {
    window.location.reload();
  })
  .catch((error => {
    console.log(error)
  }))
}

function callDeleteUserAPI(user) {
  const userId = user.getAttribute('data-_id');
  const option = getOption('DELETE');
  fetch(API_URL + '/' + userId, option)
  .then((response) => {
    if (!response.ok) {
      throw new Error("유저 삭제에 실패했습니다.");
    }
    return response.json();
  })
  .then((response) => {
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}