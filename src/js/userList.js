

const userButtonTemplate = (name, id) => `<button class="ripple" id=${id}>${name}</button>`;

const $userList = document.querySelector(".users");

export const updateUserList = (users, selectedUserId) => {
  $userList.innerHTML = users.map(user => userButtonTemplate(user["name"], user["_id"])).join("");
  document.getElementById(selectedUserId).classList.add("active");
}
