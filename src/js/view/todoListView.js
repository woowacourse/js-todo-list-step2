import {$, parseDomFromString} from '../util/util.js'
import {SELECTOR} from "../constants/constant.js";
import {itemTemplate} from "../templates/templates.js";

export class TodoListView {

    #todoList

    constructor() {
        this.#todoList = $(SELECTOR.TODO_LIST)
    }

    renderItems(items) {
        for(const item of items) {
            this.#todoList.appendChild(parseDomFromString(itemTemplate(item)))
        }
    }

}