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