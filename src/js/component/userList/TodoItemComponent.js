import * as service from '../../service.js';

export const addEvent = () => {
    const $todoList = document.querySelector(".todo-list");
    $todoList.addEventListener("click", clickTodoItem);
}

const clickTodoItem = async (event) => {
    if (event.target && event.target.nodeName == "INPUT") {
        const $todoList = event.target.closest("li");
        $todoList.classList.toggle("completed");

        const $activeUser = document.querySelector('.active');
        const userId = $activeUser.dataset.id;
        await service.toggleTodoItemToBeCompleted(userId, $todoList.dataset.id);
    }
}