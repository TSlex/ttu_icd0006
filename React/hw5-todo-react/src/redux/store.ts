import { createStore, combineReducers } from "redux";
import { AppState } from "redux/types";

import {account} from "redux/account/reducer"
import {todoTasks} from "redux/todo-tasks/reducer"
import {todoCategories} from "redux/todo-categories/reducer"
import {todoPriorities} from "redux/todo-priorities/reducer"

export default createStore(
    combineReducers<AppState>({
        account,
        todoTasks,
        todoCategories,
        todoPriorities
    })
)