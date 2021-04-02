export function todoTemplate(item) {
    const priority = item.priority;
    return `<li id=${item._id} ${item.isCompleted === true ? `class = "completed"` : ``}>
              <div class="view">
                <input class="toggle" type="checkbox" ${item.isCompleted === true ? `checked` : ``}/>
                <label class="label">
                ${item.priority === "NONE"
        ? `<select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>`
        : (priority === "FIRST" ?
            `<span class="chip primary">1순위</span>` :
            `<span class="chip secondary">2순위</span>`)}
                  ${item.contents}
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value=${item.contents} />
            </li>`;
}