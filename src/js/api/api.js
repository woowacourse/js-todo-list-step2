import {URL} from "../constants/constant.js"

export const fetchUserList = async () => {
    try {
        const result = await fetch(URL.USER)
        return await result.json()
    } catch (e) {
        alert(e)
    }
}