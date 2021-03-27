const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  const newUser = {
    name: userName
  };

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  };

  fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users", option)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status)
      }
      return data.json()
    })
    .then(data => {
      const buttonElement = document.createElement('button');
      buttonElement.className = "ripple";
      buttonElement.innerText = data.name;
      userList.insertBefore(buttonElement, userCreateButton);
    })
    .catch(error => {
      console.log(error)
    });

};

const userCreateButton = document.querySelector('.user-create-button');
userCreateButton.addEventListener('click', onUserCreateHandler);
const userList = document.getElementById("user-list");