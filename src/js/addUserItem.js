import * as form from "./requestForm.js";
import * as uri from "./requestUri.js";
import {$newTodoInput, $userList} from "./index.js";
import {loadNewTodoItems} from "./loadUserItems.js";


export const onNewTodoHandler = async (event) => {
    if (event.key === "Enter") {
        if ($newTodoInput.value.length < 2) {
            alert("내용은 2글자 이상이어야합니다!");
            return;
        }

        const $activeUser = $userList.querySelector(".active");
        const activeUserId = $activeUser.getAttribute("data-id");
        const response = await fetch(uri.allTodoItems(activeUserId), form.postNewTodo($newTodoInput.value));
        const newTodoItem = await response.json();

        $newTodoInput.value = '';
        await loadNewTodoItems(activeUserId);
    }
}