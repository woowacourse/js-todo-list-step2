import {TodoListController} from "./controller/todoListController.js";
import {BottomController} from "./controller/bottomController.js";

const todoListController = new TodoListController()
const filterController = new BottomController()

await todoListController.init()
filterController.init()



