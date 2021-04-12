export default function addTodo(userList, baseUrl, loadUserItem) {
    this.userList = userList;
    this.baseUrl = baseUrl;
    this.loadUserItem = loadUserItem;
    this.newTodo = document.querySelector('.new-todo');

    this.onAddUserItem = (event) => {
        const newTodoTitle = event.target.value;

        if (event.key === "Enter" && newTodoTitle !== "") {
            const activedUser = Array.prototype.filter.call(this.userList.childNodes, (user) => user.nodeName === 'BUTTON' && user.classList.contains('active'))[0];

            fetch(`${this.baseUrl}/api/users/${activedUser.id}/items/`, {
                method:'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    "contents":newTodoTitle
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.loadUserItem.renderUserTodo(activedUser.id);
            });
            event.target.value = "";
        }
    }

    this.newTodo.addEventListener('keyup', this.onAddUserItem);
}
