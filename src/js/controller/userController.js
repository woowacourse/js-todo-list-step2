import {UserView} from "../view/userView.js";
import {fetchUserList} from "../api/api.js";


export class UserController {

    #userView

    constructor() {
        this.#userView = new UserView()
    }

    async init() {
        this.#userView.renderUsers(await fetchUserList())
    }

}