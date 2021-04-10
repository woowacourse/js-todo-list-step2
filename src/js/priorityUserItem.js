import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {$userList} from "./index.js";
import {loadNewTodoItems} from "./loadUserItems.js";

export const onPriorityItemHandler = async (event) => {
    const $priority = event.target;
    const $li = $priority.closest("li");
    const itemId = $li.getAttribute("data-id");
    const $activeUser = $userList.querySelector(".active");
    const activeUserId = $activeUser.getAttribute("data-id");

    if ($priority.selectedIndex === 0) {
        const response = await fetch(uri.priorityTodoItem(activeUserId, itemId),
            form.putPriorityTodoItem("NONE"));
        const priorityTodoItem = await response.json();
        await loadNewTodoItems(activeUserId);
    }

    if ($priority.selectedIndex === 1) {
        const response = await fetch(uri.priorityTodoItem(activeUserId, itemId),
            form.putPriorityTodoItem("FIRST"));
        const priorityTodoItem = await response.json();
        await loadNewTodoItems(activeUserId);
    }

    if ($priority.selectedIndex === 2) {
        const response = await fetch(uri.priorityTodoItem(activeUserId, itemId),
            form.putPriorityTodoItem("SECOND"));
        const priorityTodoItem = await response.json();
        await loadNewTodoItems(activeUserId);
    }
}