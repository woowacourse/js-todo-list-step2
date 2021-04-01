import {$, parseDomFromString} from '../util/util.js'
import {SELECTOR} from "../constants/constant.js";
import {itemTemplate, priorityTemplate} from "../templates/templates.js";

export class TodoListView {

    #todoList

    constructor() {
        this.#todoList = $(SELECTOR.TODO_LIST)
    }

    renderItems(items) {
        this.#todoList.innerHTML = ''

        for(const item of items) {
            this.#todoList.appendChild(parseDomFromString(itemTemplate(item)))
        }
    }

    changePriority({_id, priority, contents}) {
        const $item = $(`li[_id="${_id}"]`)
        const $label = $item.querySelector(SELECTOR.LABEL)

        $label.innerHTML = ''
        $label.appendChild(parseDomFromString(priorityTemplate(priority)))
        $label.append(contents)
    }

}