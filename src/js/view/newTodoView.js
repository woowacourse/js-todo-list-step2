import {$} from '../util/util.js'
import {SELECTOR} from "../constants/constant.js";

export class NewTodoView {
    #newTodo

    constructor() {
        this.#newTodo = $(SELECTOR.NEW_TODO)
    }

    clear() {
        this.#newTodo.value = ''
    }

    get contents() {
        return this.#newTodo.value
    }
}