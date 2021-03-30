import * as service from '../../service.js';

export const getTodoListAndRender = async (userId) => {
    cleanTodoList();
    const getTodoItemsApi = await service.getTodoItems(userId);
    console.log("getTodoItems : ");
    console.log(getTodoItemsApi);
    const todoItems = getTodoItemsApi.data;
    const $todoList = document.querySelector(".todo-list")
    for (let i = 0; i < todoItems.length; i++) {
        const todoItemElement = createTodoListItemElement(todoItems[i]);
        $todoList.append(todoItemElement)
    }
}

const createTodoListItemElement = (todoItem) => {
    const element = document.createElement("li");
    element.setAttribute("data-id", todoItem._id);
    element.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label class="label">
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="완료된 타이틀" />`
    if (todoItem.isCompleted) {
        element.classList.add("completed");
        console.log("테스트");
        console.log(element.querySelector("input"));
        element.querySelector("input").checked = true;
    }
    const priorityLabel = element.querySelector(".label");
    if (todoItem.priority === "NONE") {
        priorityLabel.innerHTML = `
          <select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
          ${todoItem.contents}`
    } else if (todoItem.priority === "FIRST") {
        priorityLabel.innerHTML = `
          <span class="chip primary">1순위</span>
          ${todoItem.contents}`
    } else if (todoItem.priority === "SECOND") {
        priorityLabel.innerHTML = `
        <span class="chip secondary">2순위</span>
        ${todoItem.contents}`
    }
    return element;
}

const cleanTodoList = () => {
    const $todoItems = document.querySelectorAll(".todo-list li");
    for (let i = 1; i < $todoItems.length; i++) {
        $todoItems[i].remove();
    }
}