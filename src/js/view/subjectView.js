import {$, parseDomFromString} from '../util/util.js'
import {SELECTOR} from "../constants/constant.js";
import {userTitleTemplate} from "../templates/templates.js";

export class SubjectView {

    #subject

    constructor() {
        this.#subject = $(SELECTOR.USER_TITLE)
    }

    render() {
        this.#subject.innerHTML = ''

        const userName = $(SELECTOR.USER_LIST).querySelector('.active').textContent

        this.#subject.appendChild(
            parseDomFromString(userTitleTemplate(userName))
        )
    }

}