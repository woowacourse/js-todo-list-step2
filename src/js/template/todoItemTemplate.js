export default function itemTemplate(id, title, state) {
    return ` <li id="${id}" class="todo-item ${state}">
                  <div class="view">
                      <input class="toggle" ${state === "completed" ? "checked" : ""} type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${title}">
              </li>`
}

