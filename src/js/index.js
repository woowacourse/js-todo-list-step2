const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/';
const USER_LIST = document.querySelector('#user-list');

window.onload = () => {
  const userCreateButton = document.querySelector('.user-create-button')
  userCreateButton.addEventListener('click', onUserCreateHandler)
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
  fetch(API_URL+'users')
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
    userListItem.setAttribute('data-_id', user['id']);
    userListItem.setAttribute('data-name', user['name']);
    userListItem.setAttribute('data-todolist', user['todoList']);
    userListItem.setAttribute('data-active', false);

    const userListItemButton = document.createElement('button');
    userListItemButton.className += 'ripple';
    userListItemButton.setAttribute('data-id', user['_id']);
    userListItemButton.setAttribute('data-action', 'selectUser');
    userListItemButton.setAttribute('selectuser', 'click');
    userListItemButton.textContent = user['name'];
    userListItem.appendChild(userListItemButton);

    USER_LIST.appendChild(userListItem);
}

function callAddUserAPI(userName) {
  const requestBody = {
    'name': userName,
  }
  const option = getOption('POST', requestBody);
  fetch(API_URL+'users', option)
  .then((response) => {
    if (!response.ok) {
      throw new Error('유저 추가 실패');
    }
    return response.json();
  })
  .then(addUser)
  .catch((error => {
    console.log(error)
  }))
}
