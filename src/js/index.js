import {TodoListController} from "./controller/todoListController.js";
import {FilterController} from "./controller/filterController.js";

const todoListController = new TodoListController()
const filterController = new FilterController()

await todoListController.init()
filterController.init()



