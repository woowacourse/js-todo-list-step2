import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {$userList} from "./index.js";
import {loadNewTodoItems} from "./loadUserItems.js";

export const onEditItemHandler = async (event) => {
    if(event.target && event.target.className === "label") {
        const $label = event.target;
        const $li = $label.closest("li");
        const itemId = $li.getAttribute("data-id");
        const $activeUser = $userList.querySelector(".active");
        const activeUserId = $activeUser.getAttribute("data-id");

        $li.classList.add("editing");
        const $editInput = $li.querySelector('.edit');
        const legacyContent = $editInput.value;

        $editInput.addEventListener('keyup', async (event) => {
            const newContent = event.target.value;

            if (event.key === "Enter" && newContent.length >= 2) {
                const response = await fetch(uri.todoItem(activeUserId, itemId),
                    form.putEditTodoItem(newContent));
                const editedTodoItem = await response.json();
                await loadNewTodoItems(activeUserId);
                $li.classList.remove("editing");
            }

            if (event.key === "Escape") {
                event.target.value = legacyContent;
                $li.classList.remove("editing");
            }
        });
    }
}