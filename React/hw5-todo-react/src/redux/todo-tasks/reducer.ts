import { TodoTasks, TodoTaskAction } from "redux/types";
import { TODO_TASKS_ACTION_TYPES } from "./actions";
import { ITodoTaskGetDTO } from "types/ITodoTaskDTO";

export const initialState: TodoTasks = {
    tasks: [],
    tasksById: {},
    selectedTask: null,
    taskCreatingMode: false,
    taskEditingMode: false,
}

export const todoTasks = (
    state: TodoTasks = initialState,
    action: TodoTaskAction
): TodoTasks => {

    const newState: TodoTasks = { ...state }

    switch (action.type) {
        case TODO_TASKS_ACTION_TYPES.GET_TASKS:

            const idTasks: Record<string, ITodoTaskGetDTO> = {};

            ((action as any).tasks as ITodoTaskGetDTO[]).forEach((item) => idTasks[item.id] = item)

            return {
                ...newState, tasks: (action as any).tasks,
                tasksById: idTasks
            }

        case TODO_TASKS_ACTION_TYPES.SELECT_TASK:
            return { ...newState, selectedTask: (action as any).task }

        case TODO_TASKS_ACTION_TYPES.UNSELECT_TASK:
            return { ...newState, selectedTask: null }

        case TODO_TASKS_ACTION_TYPES.SET_CREATING:
            return { ...newState, taskCreatingMode: (action as any).payload }

        case TODO_TASKS_ACTION_TYPES.CREATE_TASK:

            newState.tasks[(action as any).task.id] = (action as any).task

            return { ...newState }

        case TODO_TASKS_ACTION_TYPES.SET_EDITING:
            return { ...newState, taskEditingMode: (action as any).payload }

        case TODO_TASKS_ACTION_TYPES.EDIT_TASK:
            const taskToUpdate = (action as any).task

            if (newState.selectedTask) {
                newState.selectedTask.isArchived = taskToUpdate.isArchived
                newState.selectedTask.isCompleted = taskToUpdate.isCompleted
                newState.selectedTask.todoCategoryId = taskToUpdate.todoCategoryId
                newState.selectedTask.todoPriorityId = taskToUpdate.todoPriorityId
                newState.selectedTask.todoTaskName = taskToUpdate.todoTaskName
                newState.selectedTask.todoTaskSort = taskToUpdate.todoTaskSort
                newState.selectedTask.dueDT = taskToUpdate.dueDT
            }

            return { ...newState }

        case TODO_TASKS_ACTION_TYPES.DELETE_TASK:

            const taskToDelete = (action as any).task
            let taskToDeleteIndex = -1;

            newState.tasks.forEach((item, index) => {
                if (item.id === taskToDelete.id) {
                    taskToDeleteIndex = index;
                }
            })

            if (taskToDeleteIndex < 0) return state;

            return {
                ...newState,
                tasks: [
                    ...newState.tasks.slice(0, taskToDeleteIndex),
                    ...newState.tasks.slice(taskToDeleteIndex + 1)
                ]
            }

        default: return state;
    }
}