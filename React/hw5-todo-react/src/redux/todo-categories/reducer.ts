import { TodoTasks, TodoTaskAction } from "redux/types";
import { TodoCategoriesActions } from "./actions";

export const initialState: TodoTasks = {
    tasks: [],
    selectedTask: null,
}

export const todoTasks = (
    state: TodoTasks = initialState,
    action: TodoTaskAction
) => {

    const newState: TodoTasks = {
        tasks: state.tasks,
        selectedTask: state.selectedTask,
    }

    switch (action.type) {
        case TodoCategoriesActions.GetCategories:
        case TodoCategoriesActions.SelectCategory:
        case TodoCategoriesActions.UnselectCategory:
        case TodoCategoriesActions.CreateCategory:
        case TodoCategoriesActions.EditCategory:
        case TodoCategoriesActions.DeleteCategory:
        default: return state;
    }
}