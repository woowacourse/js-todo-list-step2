import createUser from './createUser.js';
import loadUserItem from './loadUserItem.js';
import deleteUser from './deleteUser.js';
import addTodo from './addTodo.js';
import changeTodo from './changeTodo.js';

export default function App() {
  this.baseURL = "https://js-todo-list-9ca3a.df.r.appspot.com";
  this.userList = document.querySelector("#user-list");
  this.userListSection = document.querySelector("section");
  this.todoList = document.querySelector(".todo-list");

  this.createUser = new createUser(this.baseURL, this.renderUser);
  this.deleteUser = new deleteUser(this.baseURL, this.renderUserList, this.userList);
  this.loadUserItem = new loadUserItem(this.userList, this.baseURL);
  this.addTodo = new addTodo(this.userList, this.baseURL, this.loadUserItem);
  this.changeTodo = new changeTodo(this.todoList, this.baseURL, this.loadUserItem, this.userList);
  
  this.renderUser = (user) => {
      const content = `<button class="ripple" id="${user._id}">${user.name}</button>`;
      this.userList.insertAdjacentHTML('afterbegin', content);
  };

  this.renderEmptyUser = () => {
      const users = Array.from(this.userList.childNodes).filter(user => user.nodeName === 'BUTTON')
        .filter(user => !user.classList.contains('user-create-button'))
        .filter(user => !user.classList.contains('user-delete-button'));
      users.forEach(user => this.userList.removeChild(user));
  }

  this.renderUserList = () => {
      this.renderEmptyUser();

      fetch(`${this.baseURL}/api/users`, {
          method: 'GET',
          headers: {'content-type': 'application/json'}
      })
      .then(response => response.json())
      .then(result => {
          result.reverse();
          result.forEach(user => this.renderUser(user));

          const firstUser = this.userList.firstChild;
          firstUser.classList.add('active');
          this.loadUserItem.renderUserTodo(firstUser.id);
      })
      .catch(err => alert(err));
  };
}

window.onload = () => {
    const app = new App();
    app.renderUserList();
}
