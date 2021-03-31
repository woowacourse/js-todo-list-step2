import {URL} from "../constants/constant.js"

export const fetchUserList = async () => {
    try {
        const result = await fetch(URL.USER)
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