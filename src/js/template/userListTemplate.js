export default function (_id, userName, isActive) {
    return `<button id=${_id} class="ripple user-button ${isActive ? 'active':''}">${userName}</button>`
}