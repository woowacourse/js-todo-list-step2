export const createUserElement = (textContent, _id) => {
    const element = document.createElement("button");
    element.className = "ripple";
    element.textContent = textContent;
    element.setAttribute("data-id", _id);
    element.addEventListener("click", clickUserAndSetActive)
    return element;
}

const clickUserAndSetActive = (event) => {
    resetUserToNotActive();
    const $clickedUser = event.target;
    $clickedUser.classList.add("active");
}

const resetUserToNotActive = () => {
    const users = document.getElementsByClassName("ripple");
    for (let i = 0; i < users.length; i++) {
        users[i].classList.remove("active");
    }
}