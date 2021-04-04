import {CLASS} from "../constants/constant.js";

export const userTemplate = ({_id, name}) => {
    return `<button _id="${_id}"  class="ripple name">${name}</button>`;
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
    return `<li ${isCompleted ? `class="completed"` : ""} _id="${_id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${isCompleted ? `checked` : ""}/>
            <label class="label">
                ${priorityTemplate(priority)}
                ${contents}
            </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}"/>
    </li>`
}

export const priorityTemplate = (priority) => {
    if (priority === 'FIRST') {
        return `<span class="chip primary">1순위</span>`
    }

    if (priority === 'SECOND') {
        return `<span class="chip secondary">2순위</span>`
    }

    return `<select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
            </select>`
}

export const allFilterTemplate = selected => {
    return `<ul class="filters">
                <li>
                    <a href="#" class="all ${selected === '' ? CLASS.SELECTED : ""}">전체보기</a>
                </li>
                <li>
                    <a href="#active" class="active ${selected === CLASS.ACTIVE ? CLASS.SELECTED : ""}">해야할 일</a>
                </li>
                <li>
                    <a href="#completed" class="completed ${selected === CLASS.COMPLETED ? CLASS.SELECTED : ""}">완료한 일</a>
                </li>
          </ul>`
}

export const todoCountTemplate = count => {
    return `총 <strong>${count}</strong> 개`
}

export const userTitleTemplate = userName => {
    return `
        <h1 id="user-title">
            <span><strong>${userName}</strong>'s Todo List</span>
        </h1>`
}