import {$, parseDomFromString} from '../util/util.js'
import {SELECTOR} from "../constants/constant.js";
import {todoCountTemplate} from "../templates/templates.js";

export class TodoCountView {

    #todoItems
    #todoCount

    constructor() {
        this.#todoItems = $(SELECTOR.TODO_LIST)
        this.#todoCount = $(SELECTOR.TODO_COUNT)
    }

    renderByHash() {
        this.#todoCount.innerHTML = ''

        const $items = [...this.#todoItems.childNodes]
        const count = $items
            .filter($item => !$item.hasAttribute('hidden'))
            .length

        this.#todoCount.appendChild(
            parseDomFromString(todoCountTemplate(count))
        )
    }

}