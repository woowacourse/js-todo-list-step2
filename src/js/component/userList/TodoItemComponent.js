import * as service from '../../service.js';

export const addEvent = () => {
    const $todoList = document.querySelector(".todo-list");
    $todoList.addEventListener("click", clickTodoItem);
}

const clickTodoItem = (event) => {
    if (event.target && event.target.nodeName == "INPUT") {
        const $todoList = event.target.closest("li");
        $todoList.classList.toggle("completed");

        const $activeUser = document.querySelector('.active');
        const userId = $activeUser.dataset.id;
        // TODO - itemId 넣어야 돼!!
        service.toggleTodoItemToBeCompleted(userId, )
    }
}