export const userTemplate = (userName) => {
    return `<button class="ripple">${userName}</button>`;
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