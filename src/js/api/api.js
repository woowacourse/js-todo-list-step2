import {URL} from "../constants/constant.js"

export const fetchUserList = async () => {
    try {
        const result = await fetch(URL.USER)
        return await result.json()
    } catch (e) {
        alert(e)
    }
}

export const fetchTodoItems = async userId => {
    try {
        const result = await fetch(URL.ITEMS(userId))
        return await result.json()
    } catch (e) {
        alert(e)
    }
}

export const createUser = async (name) => {
    try {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name
            })
        }
        const result = await fetch(URL.USER, option)
        return await result.json()
    } catch (e) {
        alert(e)
    }
}

export const deleteUser = async (userId) => {
    try {
        const option = {
            method: 'DELETE'
        }

        const result = await fetch(URL.DELETE(userId), option)
        return await result.json()
    } catch (e) {
        alert(e)
    }
}

export const changePriority = async (userId, itemId, priority) => {
    try {
        const option = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "priority": priority
            })
        }

        const result = await fetch(URL.CHANGE_PRIORITY(userId, itemId), option)
        return await result.json()
    } catch (e) {
        alert(e)
    }
}

export const changeToggle = async (userId, itemId) => {
    try {
        const option = {
            method: 'PUT'
        }

        const result = await fetch(URL.CHANGE_TOGGLE(userId, itemId), option)
        return await result.json()
    } catch (e) {
        alert(e)
    }
}

export const createItem = async (userId, contents) => {
    try {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": contents
            })
        }

        const result = await fetch(URL.ITEMS(userId), option)
        return await result.json()
    } catch (e) {
        alert(e)
    }
}