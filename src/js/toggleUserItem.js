import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {$userList} from "./index.js";
import {loadNewTodoItems} from "./loadUserItems.js";

export const onToggleItemHandler = async (event) => {
    if (event.target && event.target.className === "toggle") {
        const $completeInput = event.target;
        const $li = $completeInput.closest("li");
        const itemId = $li.getAttribute("data-id");
        const $activeUser = $userList.querySelector(".active");
        const activeUserId = $activeUser.getAttribute("data-id");

        const response = await fetch(uri.toggleTodoItem(activeUserId, itemId),
            form.putToggleTodoItem());
        const toggleTodoItem = await response.json();
        await loadNewTodoItems(activeUserId);
    }
}