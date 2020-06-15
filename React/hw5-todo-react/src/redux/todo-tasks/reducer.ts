import { TodoTasks, TodoTaskAction } from "redux/types";
import { TodoTasksActions } from "./actions";

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
        case TodoTasksActions.GetTasks:
        case TodoTasksActions.SelectTask:
        case TodoTasksActions.UnselectTask:
        case TodoTasksActions.CreateTask:
        case TodoTasksActions.EditTask:
        case TodoTasksActions.DeleteTask:
        default: return state;
    }
}