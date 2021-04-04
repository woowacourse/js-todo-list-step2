import {FiltersView} from "../view/filtersView.js";
import {TodoListView} from "../view/todoListView.js";
import {TodoCountView} from "../view/todoCountView.js";
import {$} from "../util/util.js"
import {SELECTOR} from "../constants/constant.js";
import {deleteAllItems} from "../api/api.js";

export class BottomController {

    #filtersView
    #todoCountView
    #todoListView

    #allDeleteButton

    constructor() {
        this.#filtersView = new FiltersView()
        this.#todoListView = new TodoListView()
        this.#todoCountView = new TodoCountView()

        this.#allDeleteButton = $(SELECTOR.CLEAR_COMPLETED)
    }

    init() {
        this.#handleFilter()
        this.#handleDeleteAll()

        this.#filtersView.renderFilter()
        this.#todoCountView.renderByHash()
    }

    #handleFilter() {
        window.addEventListener('hashchange', e => {
            this.#filtersView.renderFilter()
            this.#todoListView.renderByHash()
            this.#todoCountView.renderByHash()
        })
    }

    #handleDeleteAll() {
        this.#allDeleteButton.addEventListener('click', async e => {
            const userId = $(SELECTOR.ACTIVE).getAttribute('_id')
            await deleteAllItems(userId)

            this.#todoListView.deleteAll()
        })
    }

}