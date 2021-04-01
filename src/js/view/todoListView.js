import {$, parseDomFromString} from '../util/util.js'
import {CLASS, SELECTOR} from "../constants/constant.js";
import {itemTemplate, priorityTemplate} from "../templates/templates.js";

export class TodoListView {

    #todoList

    constructor() {
        this.#todoList = $(SELECTOR.TODO_LIST)
    }

    renderItems(items) {
        this.#todoList.innerHTML = ''

        for (const item of items) {
            this.#todoList.appendChild(parseDomFromString(itemTemplate(item)))
        }

        this.renderByHash()
    }

    renderByHash() {
        let hash = document.location.hash.substring(1)

        let condition = () => false
        if (hash === CLASS.ACTIVE) condition = $item => $item.classList.contains(CLASS.COMPLETED)
        if (hash === CLASS.COMPLETED) condition = $item => !$item.classList.contains(CLASS.COMPLETED)

        for (const $item of this.#todoList.childNodes) {
            if (condition($item)) {
                $item.setAttribute('hidden', '')
            } else {
                $item.removeAttribute('hidden')
            }
        }
    }

    changePriority({_id, priority, contents}) {
        const $item = $(`li[_id="${_id}"]`)
        const $label = $item.querySelector(SELECTOR.LABEL)

        $label.innerHTML = ''
        $label.appendChild(parseDomFromString(priorityTemplate(priority)))
        $label.append(contents)
    }

    changeCompleted({_id, isCompleted}) {
        const $item = $(`li[_id="${_id}"]`)
        const $toggle = $item.querySelector(SELECTOR.TOGGLE)

        if (isCompleted) {
            $toggle.setAttribute(CLASS.CHECKED, '')
            $item.className = CLASS.COMPLETED
        } else {
            $toggle.removeAttribute(CLASS.CHECKED)
            $item.className = ''
        }
    }

    deleteAll() {
        let items = [...$(SELECTOR.TODO_LIST).childNodes]

        items.forEach($item => $item.remove())
    }

    delete(itemId) {
        const $item = $(SELECTOR.TODO_LIST).querySelector(`li[_id="${itemId}"]`)
        $item.remove()
    }

}