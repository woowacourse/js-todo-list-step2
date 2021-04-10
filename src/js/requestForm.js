export const get = () => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export const postCreateUser = (name) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name
        })
    };
}

export const postNewTodo = (contents) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contents": contents
        })
    };
}

export const deleteDestroyTodoItem = () => {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export const putEditTodoItem = (contents) => {
    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contents": contents
        })
    };
}

export const putToggleTodoItem = () => {
    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export const putPriorityTodoItem = (priority) => {
    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "priority": priority
        })
    };
}
