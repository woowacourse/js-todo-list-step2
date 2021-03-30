import * as service from '../../service.js';
import * as user from './UserComponent.js';

export function addEvent() {
    const $userDeleteButton = document.querySelector('.user-delete-button')
    $userDeleteButton.addEventListener('click', onUserCreateHandler)
}

const onUserCreateHandler = () => {
    const $activeUser = document.querySelector('.active');
    const userId = $activeUser.dataset.id;
    const userName = $activeUser.textContent;
    const isDeleteConfirm = confirm(userName + "을 삭제하시겠습니까?");
    if (isDeleteConfirm) {
        service.deleteUser(userId);
        $activeUser.remove();
    }
}