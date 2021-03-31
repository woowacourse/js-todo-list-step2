export const userTemplate = ({_id, name}) => {
    return `<button _id="${_id}"  class="ripple">${name}</button>`;
}

export const userCreateAndDeleteTemplate = () => {
    return `
        <button class="ripple user-create-button" data-action="createUser">
            + 유저 생성
        </button>
        <button class="ripple user-delete-button" data-action="deleteUser">
            삭제 -
        </button>`.trim();
}

export const itemTemplate = ({_id, contents, isCompleted, priority}) => {
    return`<li ${isCompleted ? `class="completed"` : ""} _id="${_id}">
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">
                ${priorityTemplate(priority)}
                ${contents}
            </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}"/>
    </li>`
}

const priorityTemplate = (priority) => {
    if(priority === 'FIRST') {
        return `<span class="chip primary">1순위</span>`
    }

    if(priority === 'SECOND') {
        return `<span class="chip secondary">2순위</span>`
    }

    return `<select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
            </select>`
}