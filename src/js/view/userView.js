import {$, parseDomFromString} from '../util/util.js'
import {CLASS, SELECTOR} from "../constants/constant.js"
import {userCreateAndDeleteTemplate, userTemplate} from "../templates/templates.js"

export class UserView {
    renderUsers(users) {
        const $userList = $(SELECTOR.USER_LIST)
        $userList.innerHTML = ''

        console.log(users)

        for (const user of users) {
            $userList.appendChild(
                parseDomFromString(userTemplate(user.name, false))
            )
        }

        $userList.firstElementChild.classList.add(CLASS.ACTIVE)

        $userList.appendChild(
            parseDomFromString(userCreateAndDeleteTemplate())
        )
    }

    toActivationUser($user) {
        const $userList = $(SELECTOR.USER_LIST)

        for(const childNode of $userList.childNodes) {
            childNode.className.remove(CLASS.ACTIVE)
        }

        $user.className.add(CLASS.ACTIVE)
    }
}