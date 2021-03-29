import {onUserCreateHandler} from "./userList.js"

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)