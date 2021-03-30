export default function itemTemplate(id, contents, state) {
    return ` <li id="${id}" class="todo-item ${state}">
                  <div class="view">
                      <input class="toggle" ${state === "completed" ? "checked" : ""} type="checkbox">
                      <label class="label">${contents}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${contents}">
              </li>`
}

