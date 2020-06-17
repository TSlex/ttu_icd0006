import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { AppState } from "redux/types";

import { loadingSystem } from "redux/loading-system/reducer"
import { notification } from "redux/notification/reducer"
import { account } from "redux/account/reducer"
import { todoTasks } from "redux/todo-tasks/reducer"
import { todoCategories } from "redux/todo-categories/reducer"
import { todoPriorities } from "redux/todo-priorities/reducer"

export default createStore(
    combineReducers<AppState>({
        loadingSystem,
        notification,
        account,
        todoTasks,
        todoCategories,
        todoPriorities
    }), composeWithDevTools(applyMiddleware(thunk))
)