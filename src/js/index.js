import createUser from './createUser.js';

export default function App() {
  this.baseURL = "https://js-todo-list-9ca3a.df.r.appspot.com";
  this.userList = document.querySelector("#user-list");
  this.userListSection = document.querySelector("section");
  this.userCreateButton = document.querySelector('.user-create-button');
  
  this.renderUser = (user) => {
      const content = `<button class="ripple" id="${user._id}">${user.name}</button>`;
      this.userList.insertAdjacentHTML('afterbegin', content);
  };

  this.renderUserList = () => {
      fetch(`${this.baseURL}/api/users`, {
          method: 'GET',
          headers: {'content-type': 'application/json'}
      })
      .then(response => response.json())
      .then(result => {
          result.reverse();
          result.forEach(user => this.renderUser(user));
      })
      .catch(err => alert(err));
  };

  this.createUser = new createUser(this.userCreateButton, this.baseURL, this.renderUser);
}

window.onload = () => {
    const app = new App();
    app.renderUserList();
}


