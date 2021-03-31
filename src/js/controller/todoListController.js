import {$} from "../util/util.js"
import {UserView} from "../view/userView.js";
import {createUser, deleteUser, fetchTodoItems, fetchUserList} from "../api/api.js";
import {CLASS, SELECTOR} from "../constants/constant.js";
import {TodoListView} from "../view/todoListView.js";


export class TodoListController {

    #userView
    #todoListView

    #createButton
    #deleteButton

    constructor() {
        this.#userView = new UserView()
        this.#todoListView = new TodoListView()

        this.#createButton = $(SELECTOR.USER_CREATE_BUTTON)
        this.#deleteButton = $(SELECTOR.USER_DELETE_BUTTON)
    }

    async init() {
        this.#userView.renderUsers(await fetchUserList())
        this.#handleUserCreation()
        this.#handleUserDelete()
        this.#handleUserSelection()

        const currentUserId = $(SELECTOR.ACTIVE).getAttribute("_id")
        this.#todoListView.renderItems(await fetchTodoItems(currentUserId))
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

    #handleUserSelection() {
        $(SELECTOR.USER_LIST).addEventListener('click', async e => {
            if(e.target && e.target.classList.contains(CLASS.NAME)) {
                const _id = e.target.getAttribute("_id")
                this.#userView.toActivationUser(_id)
                this.#todoListView.renderItems(await fetchTodoItems(_id))
            }
        })
    }

}