import * as service from '../../service.js';

export const addEvent = () => {
    const $input = document.querySelector(".new-todo");
    $input.addEventListener("keydown", addTodoList)
}

const addTodoList = (event) => {
    if (event.key === "Enter") {
        const $activeUser = document.querySelector('.active');
        const userId = $activeUser.dataset.id;
        const $input = document.querySelector(".new-todo");
        const $todoList = document.querySelector(".todo-list");

        service.createTodoItem(userId, $input.value);
        addTodoListElement($input, $todoList);
        resetInput();
    }

    // store에 저장

}

const addTodoListElement = ($input, $todoList) => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `<div class="view">
                            <input class="toggle" type="checkbox" />
                            <label class="label">
                                <select class="chip select">
                                    <option value="0" selected>순위</option>
                                    <option value="1">1순위</option>
                                    <option value="2">2순위</option>
                                </select>
                                ${$input.value}
                            </label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="완료된 타이틀" />`
    $todoList.appendChild(todoItem);
}

const resetInput = () => {
    const $input = document.querySelector(".new-todo");
    $input.value = "";
}