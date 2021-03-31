import {$} from "../util/util.js"
import {UserView} from "../view/userView.js";
import {createUser, deleteUser, fetchUserList} from "../api/api.js";
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
        this.#handleUserDelete()
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

    #handleUserDelete() {
        this.#deleteButton.addEventListener('click', async e => {
            const currentUser = this.#userView.getCurrentUser()
            const answer = confirm(`${currentUser.innerText}을 삭제하시겟습니니까?`)

            if(answer) {
                await deleteUser(currentUser.getAttribute("_id"))
            }
        })
    }

}