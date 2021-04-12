export default function editTodo(todoList, baseUrl, loadUserItem, userList) {
    this.todoList = todoList;
    this.baseUrl = baseUrl
    this.loadUserItem = loadUserItem;
    this.userList = userList;
    
    this.onEditTodoHandler = ({target}) => {
        if (target.classList.contains("label")) {
            const activedUser = Array.prototype.filter.call(this.userList.childNodes, (user) => user.nodeName === 'BUTTON' && user.classList.contains('active'))[0];
            const originalTodoTitle = target.textContent;
            const li = target.closest("li");

            li.classList.toggle("editing");
            li.addEventListener('keyup', (event) => {
                const edittedTodoTitle = event.target.value;
                if (event.key === "Enter") {
                    fetch(`${this.baseUrl}/api/users/${activedUser.id}/items/${li.id}`, {
                        method: 'PUT',
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify({
                            "contents":edittedTodoTitle
                        })
                    })
                    .then(() => {
                        li.classList.toggle("editing");
                        this.loadUserItem.renderUserTodo(activedUser.id);
                        return;
                    });
                }
                if (event.key === "Escape") {
                    li.classList.toggle("editing");
                    this.loadUserItem.renderUserTodo(activedUser.id);
                    return;
                }
            })
        }
    };

    this.todoList.addEventListener('dblclick', this.onEditTodoHandler);
}
