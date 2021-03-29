
const baseApiUrl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";
const userNameCountMin = 2;

const $userList = document.querySelector("#user-list");

export const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName.length < userNameCountMin) {
    prompt(userNameCountMin + "자 이상의 이름을 입력해주세요.");
    return;
  }
  const $newUser = document.createElement("button");
  $newUser.setAttribute("class", "ripple");
  $newUser.innerText = userName;
  $userList.insertAdjacentElement("afterbegin", $newUser);
  fetch(baseApiUrl,{
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({name: userName})
  });
}