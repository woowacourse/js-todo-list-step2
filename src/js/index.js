import * as userList from "./userList.js"

const onUserCreateHandler = () => {
  userList.addUser();
}

function onUserDeleteHandler() {
  userList.deleteUser();
}

const onSelectUserHandler = (event) => {
  if (event.target && event.target.tagName === "BUTTON") {
    userList.updateTodoList(event.target.id);
  }
}

document.querySelector('.user-create-button').addEventListener('click', onUserCreateHandler)

document.querySelector(".user-delete-button").addEventListener('click', onUserDeleteHandler)
document.querySelector(".users").addEventListener('click', onSelectUserHandler);

window.onload = () => {
  userList.loadData().then(
      userList.updateUserList
  );
}