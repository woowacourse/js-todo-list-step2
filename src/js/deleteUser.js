import {$userList, activeUser, onLoadUsers} from "./index.js";
import * as uri from "./requestUri.js";
import * as form from "./requestForm.js";
import {destroyAllItems} from "./destroyUserItem.js";
import {loadNewTodoItems} from "./loadUserItems.js";

export const onUserDeleteHandler = async (event) => {
    const $activeUser = $userList.querySelector(".active");
    if (window.confirm($activeUser.innerText + "을(를) 삭제하시겠습니까?")) {
        const activeUserId = $activeUser.getAttribute("data-id");
        await destroyAllItems(activeUserId);

        const response = await fetch(uri.user(activeUserId), form.deleteForm());
        const deleteUser = await response.json();

        await onLoadUsers();
        const firstUserId = $userList.firstChild.getAttribute("data-id");
        activeUser(firstUserId);
        await loadNewTodoItems(firstUserId);
    }
}