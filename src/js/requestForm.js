export function getRequestForm() {
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

export function deleteForm() {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export function addContentForm(content) {
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

export function editContentForm(content) {
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

export function toggleCompleteForm() {
    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export function changePriorityForm(priority) {
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
