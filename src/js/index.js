const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if(userName !== null) {
    const todoList = document.getElementById("user-list");
    todoList.insertAdjacentHTML("afterbegin", onAddUserItem(userName));
  }
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

function onAddUserItem(userName) {
  return ` <button class="ripple">${userName}</button> `;
}