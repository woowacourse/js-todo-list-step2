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