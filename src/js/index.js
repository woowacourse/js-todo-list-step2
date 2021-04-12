const baseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

async function onUserCreateHandler() {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName.length >= 2) {
    const data = {
      name: userName
    }
    await fetch(baseURL + "/api/users", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  } else {
    alert('이름은 2글자 이상이어야 합니다.');
  }
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

