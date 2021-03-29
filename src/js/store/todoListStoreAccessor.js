import {
    addTodoItem,
    clear,
    deepCopyStore,
    getTodoItems,
    removeTodoItem,
    removeTodoItemAll,
    toggleStateTodoItem,
    updateTodoItem
} from './todoListStore.js';
import itemTemplate from "../template/todoItemTemplate.js";
import countTemplate from "../template/todoCountTemplate.js";

export {execute, renderTodoList}

const EMPTY_STRING = "";

async function execute(command, {userId, todoId, contents} = {}, state) {
    const loadingBar = document.querySelector('#loading-bar');
    loadingBar.style.display = 'block';

    switch (command) {
        case "get" :
            await getTodoItems(userId);
            break;
        case "add" :
            await addTodoItem(userId, contents);
            break;
        case "clear" :
            clear();
            break;
        case "update" :
            await updateTodoItem(userId, todoId, contents);
            break;
        case "delete" :
            await removeTodoItem(userId, todoId);
            break;
        case "deleteAll" :
            await removeTodoItemAll(userId);
            break;
        case "toggle" :
            await toggleStateTodoItem(userId, todoId);
            break;
        default :
            throw `가능한 명령 : add, get, clear, update, delete, toggle / 입력된 명령: ${command}`;
    }

    renderTodoList(state);
}

function renderTodoList(state) {
    const todoListElement = document.querySelector(".todo-list");
    todoListElement.innerHTML = `<li>
              <div id="loading-bar" class="view" style="display:none">
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
        item => todoListElement.insertAdjacentHTML("beforeend", itemTemplate(item.id, item.contents, item.state))
    )

    const countContainerElement = document.querySelector(".count-container");
    if (countContainerElement.querySelector(".todo-count")) {
        countContainerElement.querySelector(".todo-count").remove();
    }
    countContainerElement.insertAdjacentHTML("afterbegin", createCountTemplate(state));
}

function visibleTotoList(state) {
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