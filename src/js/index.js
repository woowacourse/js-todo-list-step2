import * as userList from "./userList.js"

const onUserCreateHandler = () => {
  userList.addUser();
}

const onSelectUserHandler = (event) => {
  if (event.target && event.target.tagName === "BUTTON") {
    userList.updateTodoList(event.target.id);
  }
}
const userCreateButton = document.querySelector('.user-create-button')

userCreateButton.addEventListener('click', onUserCreateHandler)

const $userList = document.querySelector(".users");

$userList.addEventListener('click', onSelectUserHandler);

window.onload = () => {
  userList.loadData().then(
      userList.updateUserList
  );
}