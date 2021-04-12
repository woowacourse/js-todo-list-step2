export default function loadUserItem(userList, baseUrl) {
    this.userList = userList;
    this.baseUrl = baseUrl;
    this.userTitle = document.querySelector('#user-title > span > strong');
    this.$count = document.querySelector('#app > section.todoapp > div > span');
    this.$newTodo = document.querySelector('#new-todo-title');
    this.$todoList = document.querySelector('.todo-list');
    this.$filters = document.querySelector('.filters');

    this.onLoadUserItemHandler = ({target}) => {
        if (target.nodeName === 'BUTTON' && target.classList.contains('ripple') && !target.classList.contains('user-create-button') && !target.classList.contains('user-delete-button')) {
            const activedUser = Array.prototype.filter.call(this.userList.childNodes, (user) => user.nodeName === 'BUTTON' && user.classList.contains('active'))[0];
            if (activedUser.id === target.id) {
                return;
            }
            activedUser.classList.remove('active');
            target.classList.add('active');
        }
        
        const userId = target.id;
        fetch(`${this.baseUrl}/api/users/${userId}/items`, {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        })
        .then(response => response.json())
        .then(result => {
            this.renderTodo(result);
        })
        .catch(err => alert(err));

        this.userTitle.innerText = target.textContent;
    }

    this.renderTodoTemplate = (item) => {
        return ` <li id = ${item._id} class = ${item.isCompleted ? 'completed' : ''} >
                <div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label class="label">${item.contents}</label>
                    <button class="destroy" id=${item._id}></button>
                </div>
                <input class="edit" value="${item.contents}">
            </li>`;
    };
    
    this.updateTodoCount = () => {
        this.$count.innerHTML = this.$todoList.childElementCount;
    };

    this.renderTodo = (user, type) => {
        const todos = user ?? [];
        this.$todoList.innerHTML = '';
    
        type = type || 'ALL';
    
        if (type === 'ALL') {
            for (let i = 0; i < todos.length; i++) {
                this.$todoList.insertAdjacentHTML("beforeend", this.renderTodoTemplate(todos[i]));
            }
        }
        if (type === 'active') {
            for (let i = 0; i < todos.length; i++) {
                if (!todos[i].completed) {
                    this.$todoList.insertAdjacentHTML("beforeend", this.renderTodoTemplate(todos[i]));
                }
            }
        }
        if (type === 'completed') {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].completed) {
                    this.$todoList.insertAdjacentHTML("beforeend", this.renderTodoTemplate(todos[i]));
                }
            }
        }
        
        this.updateTodoCount();
    };

    this.userList.addEventListener('click', this.onLoadUserItemHandler)
}

