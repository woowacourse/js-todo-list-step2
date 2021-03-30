export const addEvent = () => {
    const $todoList = document.querySelector(".todo-list");
    $todoList.addEventListener("click", clickTodoItem);
}

const clickTodoItem = (event) => {
    if (event.target && event.target.nodeName == "INPUT") {
        const $todoList = event.target.closest("li");
        $todoList.classList.toggle("completed");
    }
}