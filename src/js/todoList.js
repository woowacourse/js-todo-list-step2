const todoTemplate = (todo) => {
  return `<li ${todo["isCompleted"] ? `class="completed"` : ``} id = ${todo["_id"]}>
              <div class="view">
                <input class="toggle" type="checkbox" ${todo["isCompleted"] ? `checked` : ``}/>
                <label class="label">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  ${todo["contents"]}
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${todo.contents}" />
            </li>`
}

const loadingTodo = `<li>
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

const todoList = document.querySelector(".todo-list");

export const updateTodoList = (todos) => {
  todoList.innerHTML = todos.map(todo => todoTemplate(todo)).join("");
}

export const addLoadingTodo = () => {
  todoList.insertAdjacentHTML("beforeend", loadingTodo);
}