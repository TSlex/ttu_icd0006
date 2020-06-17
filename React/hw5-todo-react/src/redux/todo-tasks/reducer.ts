import { TodoTasks, TodoTaskAction } from "redux/types";
import { TODO_TASKS_ACTION_TYPES } from "./actions";

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
        case TODO_TASKS_ACTION_TYPES.GET_TASKS:
        case TODO_TASKS_ACTION_TYPES.SELECT_TASK:
        case TODO_TASKS_ACTION_TYPES.UNSELECT_TASK:
        case TODO_TASKS_ACTION_TYPES.CREATE_TASK:
        case TODO_TASKS_ACTION_TYPES.EDIT_TASK:
        case TODO_TASKS_ACTION_TYPES.DELETE_TASK:
        default: return state;
    }
}