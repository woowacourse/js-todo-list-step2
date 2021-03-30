import * as service from '../../service.js';
import * as user from './UserComponent.js';

export function addEvent() {
    const $userDeleteButton = document.querySelector('.user-delete-button')
    $userDeleteButton.addEventListener('click', onUserCreateHandler)
}

const onUserCreateHandler = () => {
    const isDeleteConfirm = confirm("을 삭제하시겠습니까?");

}