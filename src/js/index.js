
const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)
const $userItem = document.querySelector(".user-list");
$userItem.addEventListener('click', selectUser);

function onUserCreateHandler() {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if(userName !== null) {
    const todoList = document.getElementById("user-list");
    todoList.insertAdjacentHTML("afterbegin", onAddUserItem(userName));
  }
}

function onAddUserItem(userName) {
  return ` <button class="ripple">${userName}</button> `;
}

function active(user) {
  const users = document.getElementsByClassName("active");
  for (let i = 0; i < users.length; i++) {
    users[i].classList.remove("active");
  }
  user.classList.add("active");
}

function selectUser(event) {
  active(event.target.closest("button"));
}