const BASIC_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
const USERS = "/api/users";

const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    addUser(userName);
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


async function addUser(userName) {
    const addUserRes = await fetch(BASIC_URL + USERS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName
        }),
    })

    const user = await addUserRes.json()
    const user_list = document.getElementById('user-list')
    const button = "<button class=ripple>" + user.name + "</button>"
    const user_list_contents = user_list.innerHTML
    user_list.innerHTML = button + user_list_contents
}

