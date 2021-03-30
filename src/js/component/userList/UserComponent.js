export const createUserElement = (textContent, _id) => {
    const element = document.createElement("button");
    element.className = "ripple";
    element.textContent = textContent;
    element.setAttribute("data-id", _id);
    return element;
}