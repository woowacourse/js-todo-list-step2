import {FiltersView} from "../view/filtersView.js";
import {TodoListView} from "../view/todoListView.js";

export class FilterController {

    #filtersView
    #todoListView

    constructor() {
        this.#filtersView = new FiltersView()
        this.#todoListView = new TodoListView()
    }

    init() {
        this.#handleFilter()
    }

    #handleFilter() {
        window.addEventListener('hashchange', e => {
            console.log(e)
            this.#filtersView.renderFilter()
            this.#todoListView.renderByHash()
        })
    }

}