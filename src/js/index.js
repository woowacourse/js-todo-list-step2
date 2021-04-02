const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

async function userCreateHandler() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (userName.length >= 2) {
        const userForm = createUserForm(userName);
        const createdUserName = await createUser(userForm);
        console.log(createdUserName);
    } else {
        alert("이름은 두 글자 이상이어야 합니다!");
    }
}

async function createUser(userForm) {
    const createdUserResponse = await fetch(BASE_URL + "/api/users", userForm);
    const createdUser = await createdUserResponse.json();
    return createdUser.name;
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

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', userCreateHandler)

