export function getUserListForm() {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export function createUserForm(userName) {
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

export function deleteUserForm() {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export function getUserTodoListForm() {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export function addTodoListForm(contents) {
    const newContents = {
        contents: contents
    };
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContents)
    };
}

export function completeTodoListForm() {
    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}