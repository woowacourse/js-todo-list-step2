const baseURL = "https://js-todo-list-9ca3a.df.r.appspot.com";

const inputUserName = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName.length < 2) {
    alert("User의 이름은 최소 2글자 이상이어야 한다.");
    return inputUserName();
  }
  return userName;
}

const onUserCreateHandler = () => {
  const userName = inputUserName();
  fetch(`${baseURL}/api/users`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      'name': `${userName}`
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(err => alert(err));
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

