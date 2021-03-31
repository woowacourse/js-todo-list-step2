import {$, parseDomFromString} from '../util/util.js'
import {CLASS, SELECTOR} from "../constants/constant.js"
import {userCreateAndDeleteTemplate, userTemplate} from "../templates/templates.js"

export class UserView {

    #createButton
    #deleteButton

    constructor() {
        this.#createButton = $(SELECTOR.USER_CREATE_BUTTON)
        this.#deleteButton = $(SELECTOR.USER_DELETE_BUTTON)
    }

    renderUsers(users) {
        const $userList = $(SELECTOR.USER_LIST)
        $userList.innerHTML = ''

        for (const user of users) {
            $userList.appendChild(
                parseDomFromString(userTemplate(user))
            )
        }

        this.toActivationUser($userList
            .firstElementChild
            .getAttribute("_id"))

        $userList.appendChild(this.#createButton)
        $userList.appendChild(this.#deleteButton)
    }

    toActivationUser(id) {
        const $userList = $(SELECTOR.USER_LIST)

        for(const childNode of $userList.childNodes) {
            childNode.classList.remove(CLASS.ACTIVE)
        }

        const $user = $(`button[_id="${id}"]`)
        $user.classList.add(CLASS.ACTIVE)
    }
}