const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const userTitle = document.getElementById("user-title");
const userList = document.getElementById("user-list");
const userCreateButton = document.querySelector(".user-create-button");
const userDeleteButton = document.querySelector(".user-delete-button");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".new-todo");
const deleteAllButton = document.querySelector(".clear-completed");

function getRequestForm() {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

async function showAllUsers(userId) {
    const showAllUsersResponse = await fetch(BASE_URL + "/api/users", getRequestForm());
    const allUsers = await showAllUsersResponse.json();
    for (let i = 0; i < allUsers.length; i++) {
        if (document.getElementById(allUsers[i]._id) == null) {
            const userButton = document.createElement("button");
            userButton.id = allUsers[i]._id;
            userButton.innerText = allUsers[i].name;
            userButton.classList.add("ripple");
            userList.prepend(userButton);
        }
    }
    showActiveUser(userId);
}

function showActiveUser(userId) {
    let activeUser = document.getElementById(userId);
    if (activeUser == null) {
        const defaultUser = userList.firstChild;
        defaultUser.classList.add("active");
        activeUser = defaultUser;
        userLoad(activeUser.id);
    } else {
        active(activeUser);
    }
    showActiveUserTodo(activeUser);
}

async function userLoad(userId) {
    userTitle.removeChild(userTitle.firstChild);
    const userLoadResponse = await fetch(BASE_URL + "/api/users/" + userId, getRequestForm());
    const user = await userLoadResponse.json();
    userTitle.insertAdjacentHTML("beforeend", `<span><strong>${user.name}</strong>'s Todo List</span>`);
}

function active(activeUser) {
    const activeUsers = document.getElementsByClassName("active");
    for (let i = 0; i < activeUsers.length; i++) {
        activeUsers[i].classList.remove("active");
    }
    activeUser.classList.add("active");
    userLoad(activeUser.id);
}

function createUserForm(userName) {
    const newUser = {
        name: userName
    };

    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    };
}

async function userCreateHandler() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (userName.length >= 2) {
        const userForm = createUserForm(userName);
        const createdUserId = await createUser(userForm);
        await showAllUsers(createdUserId);
    } else {
        alert("이름은 두 글자 이상이어야 합니다!");
    }
}

async function createUser(userForm) {
    const createdUserResponse = await fetch(BASE_URL + "/api/users", userForm);
    const createdUser = await createdUserResponse.json();
    return createdUser._id;
}

function selectUser(event) {
    const button = event.target.closest("button");
    if (button.id != null) {
        const activeUser = event.target;
        active(activeUser);
        showActiveUserTodo(activeUser);
    }
}

async function showActiveUserTodo(activeUser) {
    const todoByUserIdResponse = await fetch(BASE_URL + "/api/users/" + activeUser.id, getRequestForm());
    const todo = await todoByUserIdResponse.json();
    const activeUserTodo = todo.todoList;
    removeOtherTodo();
    for (let i = 0; i < activeUserTodo.length; i++) {
        const item = activeUserTodo[i];
        todoList.insertAdjacentHTML("beforeend", todoTemplate(item));
    }
}

function removeOtherTodo() {
    while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
}

function todoTemplate(item) {
    const priority = item.priority;
    return `<li id=${item._id} ${item.isCompleted === true ? `class = "completed"` : ``}>
              <div class="view">
                <input class="toggle" type="checkbox" ${item.isCompleted === true ? `checked` : ``}/>
                <label class="label">
                ${item.priority === "NONE"
        ? `<select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>`
        : (priority === "FIRST" ?
            `<span class="chip primary">1순위</span>` :
            `<span class="chip secondary">2순위</span>`)}
                  ${item.contents}
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value=${item.contents} />
            </li>`;
}

function deleteForm() {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

async function deleteUserById() {
    const activeUser = document.querySelector(".active");
    await fetch(BASE_URL + "/api/users/" + activeUser.id, deleteForm());
    userDeleteButton.classList.remove("active");
    const deletedUser = document.getElementById(activeUser.id);
    userList.removeChild(deletedUser);
    showActiveUser();
}

function addContentForm(content) {
    const newContents = {
        contents: content
    };

    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContents)
    };
}

async function addTodoByUser(event) {
    const content = event.target.value;
    if (event.key === "Enter") {
        if (content.length < 2) {
            alert("내용은 2글자 이상이어야합니다!");
            return;
        }
        const activeUser = document.querySelector(".active");
        const addTodoResponse = await fetch(BASE_URL + "/api/users/" + activeUser.id + "/items", addContentForm(content));
        const newTodo = await addTodoResponse.json();
        todoList.insertAdjacentHTML("beforeend", todoTemplate(newTodo));
        todoInput.value = "";
    }
}

function editContentForm(content) {
    const newContents = {
        contents: content
    };

    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContents)
    };
}

async function editTodoContent(activeUser, itemId, content) {
    const editTodoResponse = await fetch(BASE_URL + "/api/users/" + activeUser.id + "/items/" + itemId, editContentForm(content));
    return await editTodoResponse.json();
}

function toggleCompleteForm() {
    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

async function toggleComplete(activeUser, itemId) {
    const toggleCompleteResponse = await fetch(BASE_URL + "/api/users/" + activeUser.id + "/items/" + itemId + "/toggle", toggleCompleteForm());
    return await toggleCompleteResponse.json();
}

async function deleteAll() {
    const activeUser = document.querySelector(".active");
    await fetch(BASE_URL + "/api/users/" + activeUser.id + "/items/", deleteForm());
    showActiveUserTodo(activeUser);
}

async function deleteOne(activeUser, itemId) {
    await fetch(BASE_URL + "/api/users/" + activeUser.id + "/items/" + itemId, deleteForm());
}

function changePriorityForm(priority) {
    const todo = {
        priority: priority
    };

    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    };
}

async function changePriority(activeUser, itemId, priority) {
    await fetch(BASE_URL + "/api/users/" + activeUser.id + "/items/" + itemId + "/priority", changePriorityForm(priority));
}

showAllUsers();

userCreateButton.addEventListener("click", userCreateHandler);
userDeleteButton.addEventListener("click", deleteUserById)
userList.addEventListener("click", selectUser);
todoInput.addEventListener("keypress", addTodoByUser);
deleteAllButton.addEventListener("click", deleteAll);

todoList.addEventListener("click", async function (event) {
    const activeUser = document.querySelector(".active");
    const li = event.target.closest("li");
    const itemId = li.id;
    if (event.target.classList.contains("toggle")) {
        await toggleComplete(activeUser, itemId);
        showActiveUserTodo(activeUser);
    }
    if (event.target.classList.contains("destroy")) {
        await deleteOne(activeUser, itemId);
        showActiveUserTodo(activeUser);
    }
});

todoList.addEventListener("dblclick", function (event) {
    const li = event.target.closest("li");
    const label = li.getElementsByClassName("label")[0];
    const editInput = li.getElementsByClassName("edit")[0];
    const originalValue = label.innerText;

    li.classList.toggle("editing");

    editInput.addEventListener("keyup", async function (event) {
        const item = event.target;
        const itemId = item.parentNode.id;
        const content = item.value;
        if (event.key === "Enter" && content.length >= 2) {
            const activeUser = document.querySelector(".active");
            await editTodoContent(activeUser, itemId, content);
            showActiveUserTodo(activeUser);
            li.classList.remove("editing");
        }
        if (event.key === "Escape") {
            event.target.value = originalValue;
            li.classList.remove("editing");
        }
    });
});

todoList.addEventListener("change", async function (event) {
    const activeUser = document.querySelector(".active");
    const itemId = event.target.closest("li").id;
    const option = event.target;
    const selectedOption = option.options[option.selectedIndex].value;
    if (selectedOption === "1") {
        await changePriority(activeUser, itemId, "FIRST");
        showActiveUserTodo(activeUser);
    } else if (selectedOption === "2") {
        await changePriority(activeUser, itemId, "SECOND");
        showActiveUserTodo(activeUser);
    }
});