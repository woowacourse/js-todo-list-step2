import {$, priorityNumberToString} from "../util/util.js"
import {UserView} from "../view/userView.js";
import {
    changePriority,
    changeToggle,
    createItem,
    createUser,
    deleteItem,
    deleteUser, editItem,
    fetchTodoItems,
    fetchUserList
} from "../api/api.js";
import {CLASS, NODE_NAME, SELECTOR} from "../constants/constant.js";
import {TodoListView} from "../view/todoListView.js";
import {NewTodoView} from "../view/newTodoView.js";
import {TodoCountView} from "../view/todoCountView.js";
import {SubjectView} from "../view/subjectView.js";

export class TodoListController {

    #subjectView
    #newTodoView
    #userView
    #todoListView
    #todoCountView

    #createButton
    #deleteButton

    constructor() {
        this.#subjectView = new SubjectView()
        this.#newTodoView = new NewTodoView()
        this.#userView = new UserView()
        this.#todoListView = new TodoListView()
        this.#todoCountView = new TodoCountView()

        this.#createButton = $(SELECTOR.USER_CREATE_BUTTON)
        this.#deleteButton = $(SELECTOR.USER_DELETE_BUTTON)
    }

    async init() {

        this.#handleUserCreation()
        this.#handleUserDelete()
        this.#handleUserSelection()
        this.#handleChangePriority()
        this.#handleToggle()
        this.#handleCreateTime()
        this.#handleDeleteItem()
        this.#handleEditItem()

        this.#userView.renderUsers(await fetchUserList())
        const currentUserId = $(SELECTOR.ACTIVE).getAttribute("_id")
        this.#todoListView.renderItems(await fetchTodoItems(currentUserId))
        this.#todoListView.renderByHash()

        this.#subjectView.render()
    }

    #handleUserCreation() {
        this.#createButton.addEventListener('click', async e => {
            const name = prompt("생성할 유저 이름을 입력해 주세요")
            if (name === '') return

            const result = await createUser(name)
            this.#userView.renderUsers(await fetchUserList())
            this.#userView.toActivationUser(result._id)
        })
    }

    #handleUserDelete() {
        this.#deleteButton.addEventListener('click', async e => {
            const currentUser = this.#userView.getCurrentUser()
            const answer = confirm(`${currentUser.innerText}을 삭제하시겟습니니까?`)

            if (answer) {
                await deleteUser(currentUser.getAttribute("_id"))
                this.#userView.renderUsers(await fetchUserList())
            }
        })
    }

    #handleUserSelection() {
        $(SELECTOR.USER_LIST).addEventListener('click', async e => {
            if (e.target && e.target.classList.contains(CLASS.NAME)) {
                const _id = e.target.getAttribute("_id")
                this.#userView.toActivationUser(_id)
                this.#todoListView.renderItems(await fetchTodoItems(_id))
                this.#subjectView.render()
                this.#todoCountView.renderByHash()
            }
        })
    }

    #handleChangePriority() {
        $(SELECTOR.TODO_LIST).addEventListener('change', async e => {
            if (e.target && e.target.nodeName === NODE_NAME.SELECT) {
                const user_id = $(SELECTOR.ACTIVE).getAttribute('_id')
                const item_id = e.target.closest("Li").getAttribute("_id")
                const priority = priorityNumberToString(e.target.value)

                const result = await changePriority(user_id, item_id, priority)
                this.#todoListView.changePriority(result)
            }
        })
    }

    #handleToggle() {
        $(SELECTOR.TODO_LIST).addEventListener('change', async e => {
            if (e.target && e.target.classList.contains(CLASS.TOGGLE)) {
                const user_id = $(SELECTOR.ACTIVE).getAttribute('_id')
                const item_id = e.target.closest("Li").getAttribute("_id")

                const result = await changeToggle(user_id, item_id)
                this.#todoListView.changeCompleted(result)
            }
        })
    }

    #handleCreateTime() {
        const condition = ({keyCode}) => {
            return keyCode === 13 &&
                [...document.activeElement.classList]
                    .find(cls => cls === "edit") === undefined
        }

        document.addEventListener('keyup', async e => {
            if (condition(e)) {
                const userId = $(SELECTOR.ACTIVE).getAttribute('_id')
                const contents = this.#newTodoView.contents

                await createItem(userId, contents)
                this.#newTodoView.clear()
                this.#todoListView.renderItems(await fetchTodoItems(userId))
            }
        })
    }

    #handleDeleteItem() {
        $(SELECTOR.TODO_LIST).addEventListener('click', async e => {
            if (e.target && e.target.classList.contains(CLASS.DESTROY)) {
                const userId = $(SELECTOR.ACTIVE).getAttribute('_id')
                const itemId = e.target.closest("Li").getAttribute("_id")

                await deleteItem(userId, itemId)
                this.#todoListView.delete(itemId)
                this.#todoCountView.renderByHash()
            }
        })
    }

    #handleEditItem() {
        $(SELECTOR.TODO_LIST).addEventListener('dblclick', async e => {
            if (e.target && e.target.classList.contains(CLASS.LABEL)) {
                const itemId = e.target.closest("Li").getAttribute("_id")

                this.#todoListView.toEditMode(itemId)
            }
        })

        const condition = ({keyCode}) => {
            return keyCode === 13 &&
                [...document.activeElement.classList]
                    .find(cls => cls === "edit") !== undefined
        }

        document.addEventListener('keyup', async e => {
            if(condition(e)) {
                const itemId = e.target.closest("Li").getAttribute("_id")
                const userId = $(SELECTOR.ACTIVE).getAttribute("_id")
                const contents = e.target.closest(SELECTOR.EDIT).value

                await editItem(userId, itemId, contents)
                this.#todoListView.renderItems(await fetchTodoItems(userId))
            }
        })

        document.addEventListener('keyup', e => {
            if( e.key === "Escape" && $(SELECTOR.TODO_LIST).querySelector(SELECTOR.EDITING) !== null) {
                this.#todoListView.toViewMode()
            }
        })
    }

}