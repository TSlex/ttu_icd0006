import { TodoTasks, TodoTaskAction } from "redux/types";
import { TODO_TASKS_ACTION_TYPES } from "./actions";
import { ITodoTaskGetDTO } from "types/ITodoTaskDTO";
import moment from "moment-timezone";

export const initialState: TodoTasks = {
    // tasks: [],
    tasks: {},
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

            const tasks: Record<string, ITodoTaskGetDTO> = {};

            ((action as any).tasks as ITodoTaskGetDTO[]).forEach(
                (item) => {

                    if (item.dueDT) {
                        item.dueDT = moment.tz(item.dueDT, "UTC").toDate()
                    }

                    tasks[item.id] = item
                }
            )

            return { ...newState, tasks: tasks }

        case TODO_TASKS_ACTION_TYPES.SELECT_TASK:
            return { ...newState, selectedTask: (action as any).task }

        case TODO_TASKS_ACTION_TYPES.UNSELECT_TASK:
            return { ...newState, selectedTask: null }

        case TODO_TASKS_ACTION_TYPES.SET_CREATING:
            return { ...newState, taskCreatingMode: (action as any).payload }

        case TODO_TASKS_ACTION_TYPES.CREATE_TASK:

            const taskToCreate = (action as any).task

            newState.tasks[taskToCreate.id] = taskToCreate

            return { ...newState }

        case TODO_TASKS_ACTION_TYPES.SET_EDITING:
            return { ...newState, taskEditingMode: (action as any).payload }

        case TODO_TASKS_ACTION_TYPES.EDIT_TASK:
            const taskToUpdate = (action as any).task

            // if (newState.selectedTask) {
            //     newState.selectedTask.isArchived = taskToUpdate.isArchived
            //     newState.selectedTask.isCompleted = taskToUpdate.isCompleted
            //     newState.selectedTask.todoCategoryId = taskToUpdate.todoCategoryId
            //     newState.selectedTask.todoPriorityId = taskToUpdate.todoPriorityId
            //     newState.selectedTask.todoTaskName = taskToUpdate.todoTaskName
            //     newState.selectedTask.todoTaskSort = taskToUpdate.todoTaskSort
            //     newState.selectedTask.dueDT = taskToUpdate.dueDT
            // }

            newState.tasks[taskToUpdate.id] = { ...newState.tasks[taskToUpdate.id] ?? null, ...taskToUpdate }

            return { ...newState, tasks: { ...newState.tasks } }

        case TODO_TASKS_ACTION_TYPES.DELETE_TASK:

            const taskToDelete = (action as any).task

            delete newState.tasks[taskToDelete.id]

            return { ...newState, tasks: { ...newState.tasks } }


        // let taskToDeleteIndex = -1;

        // newState.tasks.forEach((item, index) => {
        //     if (item.id === taskToDelete.id) {
        //         taskToDeleteIndex = index;
        //     }
        // })

        // if (taskToDeleteIndex < 0) return state;

        // return {
        //     ...newState,
        //     tasks: [
        //         ...newState.tasks.slice(0, taskToDeleteIndex),
        //         ...newState.tasks.slice(taskToDeleteIndex + 1)
        //     ]
        // }

        default: return state;
    }
}