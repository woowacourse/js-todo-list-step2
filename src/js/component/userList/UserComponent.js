import * as TodoList from './TodoListComponent.js';

export const createUserElement = (textContent, _id) => {
    const element = document.createElement("button");
    element.className = "ripple";
    element.textContent = textContent;
    element.setAttribute("data-id", _id);
    element.addEventListener("click", onClickUser)
    return element;
}

const onClickUser = (event) => {
    resetUserToNotActive();
    clickedUserSetActive(event);
    TodoList.getTodoListAndRender(event.target.getAttribute("data-id"));
}

const clickedUserSetActive = (event) => {
    const $clickedUser = event.target;
    $clickedUser.classList.add("active");
}

const resetUserToNotActive = () => {
    const users = document.getElementsByClassName("ripple");
    for (let i = 0; i < users.length; i++) {
        users[i].classList.remove("active");
    }
}