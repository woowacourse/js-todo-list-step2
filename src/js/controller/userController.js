import {$} from "../util/util.js"
import {UserView} from "../view/userView.js";
import {createUser, fetchUserList} from "../api/api.js";
import {SELECTOR} from "../constants/constant.js";


export class UserController {

    #userView
    #createButton
    #deleteButton

    constructor() {
        this.#userView = new UserView()
        this.#createButton = $(SELECTOR.USER_CREATE_BUTTON)
        this.#deleteButton = $(SELECTOR.USER_DELETE_BUTTON)
    }

    async init() {
        this.#userView.renderUsers(await fetchUserList())
        this.#handleUserCreation()
    }

    #handleUserCreation() {
        this.#createButton.addEventListener('click', async e => {
            const name = prompt("생성할 유저 이름을 입력해 주세요")
            if(name === '') return

            const result = await createUser(name)
            this.#userView.renderUsers(await fetchUserList())
            this.#userView.toActivationUser(result._id)
        })
    }

}