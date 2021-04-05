
const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)
const userDeleteButton = document.querySelector('.user-delete-button')
userDeleteButton.addEventListener('click', deleteUser)
const $userItem = document.querySelector(".user-list");
$userItem.addEventListener('click', selectUser);

function onUserCreateHandler() {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if(userName !== null) {
    const todoList = document.getElementById("user-list");
    todoList.insertAdjacentHTML("afterbegin", onAddUserItem(userName));
  }
}

function deleteUser() {
  const user = document.querySelector(".active");
  const ans = confirm(user.textContent + "을 삭제하시겠습니까?");
  if(ans) {
    user.remove();
  }
}

function onAddUserItem(userName) {
  return ` <button class="ripple">${userName}</button> `;
}

function selectUser(event) {
  if(event.target.classList.contains("management")) {
    return;
  }
  active(event.target.closest("button"));
}

function active(user) {
  const users = document.getElementsByClassName("active");
  for (let i = 0; i < users.length; i++) {
    users[i].classList.remove("active");
  }
  user.classList.add("active");
}
