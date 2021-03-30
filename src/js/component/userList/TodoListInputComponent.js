import * as service from '../../service.js';

export const addEvent = () => {
    const $input = document.querySelector(".new-todo");
    $input.addEventListener("keydown", addTodoList)
}

const addTodoList = async (event) => {
    if (event.key === "Enter") {
        const $activeUser = document.querySelector('.active');
        const userId = $activeUser.dataset.id;
        const $input = document.querySelector(".new-todo");
        if ($input.value.length < 2) {
            alert("2글자 이상이어야 합니다.");
            return;
        }
        const $todoList = document.querySelector(".todo-list");

        const createTodoItemApi = await service.createTodoItem(userId, $input.value);
        const todoItemId = createTodoItemApi.data._id;
        addTodoItemElement($input, $todoList, todoItemId);
        resetInput();
    }
}

const addTodoItemElement = ($input, $todoList, todoItemId) => {
    const todoItem = document.createElement("li");
    todoItem.setAttribute("data-id", todoItemId);
    todoItem.innerHTML = `<div class="view">
                            <input class="toggle" type="checkbox" />
                            <label class="label">
                                <select class="chip select">
                                    <option value="0" selected>순위</option>
                                    <option value="1">1순위</option>
                                    <option value="2">2순위</option>
                                </select>
                                <span class="todo-item-text">${$input.value}</span>
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