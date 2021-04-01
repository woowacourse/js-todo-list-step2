import {$, parseDomFromString} from '../util/util.js'
import {SELECTOR} from "../constants/constant.js";
import {allFilterTemplate} from "../templates/templates.js";

export class FiltersView {

    #filter

    constructor() {
        this.#filter = $(SELECTOR.FILTERS)
    }

    renderFilter() {
        const hash = document.location.hash
        this.#filter.innerHTML = ''

        this.#filter.appendChild(
            parseDomFromString(
                allFilterTemplate(hash.substring(1))
            )
        )
    }

}