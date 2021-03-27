import {addTodoItem, deepCopyStore, removeTodoItem, toggleStateTodoItem, updateTodoItem} from './todoListStore.js';
import itemTemplate from "../template/todoItemTemplate.js";
import countTemplate from "../template/todoCountTemplate.js";

export {execute, renderTodoList}

const EMPTY_STRING = "";

function execute(command, {id, title}, state) {
    switch (command) {
        case "add" :
            addTodoItem(id, title);
            break;
        case "update" :
            updateTodoItem(id, title);
            break;
        case "delete" :
            removeTodoItem(id);
            break;
        case "toggle" :
            toggleStateTodoItem(id);
            break;
        default :
            throw `가능한 명령 : add, update, delete, toggle / 입력된 명령: ${command}`;
    }
    renderTodoList(state);
}

function renderTodoList(state) {
    const todoListElement = document.querySelector(".todo-list");
    todoListElement.innerHTML = `<li>
              <div class="view">
                <label class="label">
                  <div class="animated-background">
                    <div class="skel-mask-container">
                      <div class="skel-mask"></div>
                    </div>
                  </div>
                </label>
              </div>
            </li>`;
    visibleTotoList(state).forEach(
        item => todoListElement.insertAdjacentHTML("beforeend", itemTemplate(item.id, item.title, item.state))
    )

    const countContainerElement = document.querySelector(".count-container");
    if (countContainerElement.querySelector(".todo-count")) {
        countContainerElement.querySelector(".todo-count").remove();
    }
    countContainerElement.insertAdjacentHTML("afterbegin", createCountTemplate(state));
}

function visibleTotoList(state) {
    console.log(state);

    if (state && state !== "all") {
        return deepCopyStore().filter(item => item.state === state);
    } else {
        return deepCopyStore();
    }
}

function createCountTemplate(state) {
    if (state) {
        return countTemplate(deepCopyStore().filter(item => item.state === state).length);
    } else {
        return countTemplate(deepCopyStore().length);
    }
}