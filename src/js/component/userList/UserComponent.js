export const createUserElement = (textContent) => {
    const element = document.createElement("button");
    element.className = "ripple";
    element.textContent = textContent;
    return element;
}