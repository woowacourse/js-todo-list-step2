export default function changeTodo(todoList, baseUrl, loadUserItem, userList) {
    this.todoList = todoList;
    this.baseUrl = baseUrl
    this.loadUserItem = loadUserItem;
    this.userList = userList;

    this.onChangeTodoHandler = (event) => {
        const target = event.target;

        if (target.classList.contains("toggle")) {
            const activedUser = Array.prototype.filter.call(this.userList.childNodes, (user) => user.nodeName === 'BUTTON' && user.classList.contains('active'))[0];
            const li = target.closest("li");

            fetch(`${this.baseUrl}/api/users/${activedUser.id}/items/${li.id}/toggle`, {
                method:'PUT',
                headers: {'content-type': 'application/json'}
            })
            .then(() => {
                this.loadUserItem.renderUserTodo(activedUser.id);
            })
        }
        if (target.classList.contains("destroy")) {
            const activedUser = Array.prototype.filter.call(this.userList.childNodes, (user) => user.nodeName === 'BUTTON' && user.classList.contains('active'))[0];
            const li = target.closest("li");

            fetch(`${this.baseUrl}/api/users/${activedUser.id}/items/${li.id}`, {
                method:'DELETE',
                headers: {'content-type': 'application/json'}
            })
            .then(() => {
                this.loadUserItem.renderUserTodo(activedUser.id);
            })
        }
    };

    this.todoList.addEventListener('click', this.onChangeTodoHandler);
}
