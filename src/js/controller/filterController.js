import {FiltersView} from "../view/filtersView.js";
import {TodoListView} from "../view/todoListView.js";
import {TodoCountView} from "../view/todoCountView.js";

export class FilterController {

    #filtersView
    #todoCountView
    #todoListView

    constructor() {
        this.#filtersView = new FiltersView()
        this.#todoListView = new TodoListView()
        this.#todoCountView = new TodoCountView()
    }

    init() {
        this.#handleFilter()

        this.#filtersView.renderFilter()
        this.#todoCountView.renderByHash()

    }

    #handleFilter() {
        window.addEventListener('hashchange', e => {
            console.log(e)
            this.#filtersView.renderFilter()
            this.#todoListView.renderByHash()
            this.#todoCountView.renderByHash()
        })
    }

}