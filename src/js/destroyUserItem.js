import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {$userList} from "./index.js";
import {loadNewTodoItems} from "./loadUserItems.js";

export const onDestroyItemHandler = async (event) => {
    if (event.target && event.target.className === "destroy") {
        const $activeUser = $userList.querySelector(".active");
        const activeUserId = $activeUser.getAttribute("data-id");

        const $destroyButton = event.target;
        const $li = $destroyButton.closest("li");
        const itemId = $li.getAttribute("data-id");

        const response = await fetch(uri.todoItem(activeUserId, itemId),
            form.deleteForm());
        const destroyTodoItem = await response.json();

        await loadNewTodoItems(activeUserId);
    }
}

export const onDestroyAllItemsHandler = async (event) => {
    const $activeUser = $userList.querySelector(".active");
    const activeUserId = $activeUser.getAttribute("data-id");

    const response = await fetch(uri.allTodoItems(activeUserId),
        form.deleteForm());
    const destroyAllTodoItems = await response.json();

    await loadNewTodoItems(activeUserId);
}