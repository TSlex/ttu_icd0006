import { getCategories } from './../todo-categories/actions';
import {
    TodoTaskGetTasksAction,
    TodoTaskSelectTaskAction,
    TodoTaskUnselectTaskAction,
    TodoTaskCreateTaskAction,
    TodoTaskEditTaskAction,
    TodoTaskDeleteTaskAction,
} from 'redux/types';

import { ITodoTaskGetDTO, ITodoTaskPostDTO, ITodoTaskPutDTO } from "types/ITodoTaskDTO";
import { setLocalLoading } from 'redux/loading-system/actions';
import TodoTasksApi from 'services/TodoTasksApi';
import { setErrors } from 'redux/notification/actions';
import { getPriorities } from 'redux/todo-priorities/actions';

export enum TODO_TASKS_ACTION_TYPES {
    GET_TASKS = "TODO_TASKS:GET_TASKS",

    SELECT_TASK = "TODO_TASKS:SELECT_TASK",
    UNSELECT_TASK = "TODO_TASKS:UNSELECT_TASK",

    SET_CREATING = "TODO_TASKS:SET_CREATING",
    CREATE_TASK = "TODO_TASKS:CREATE_TASK",

    SET_EDITING = "TODO_TASKS:SET_EDITING",
    EDIT_TASK = "TODO_TASKS:EDIT_TASK",
    DELETE_TASK = "TODO_TASKS:DELETE_TASK",
}

export const getTasks = () => async (dispatch: any) => {

    dispatch(setLocalLoading(true))
    dispatch(getCategories())
    dispatch(getPriorities())

    let result = await TodoTasksApi.Index()

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(getTasksResult(result.data!));
    }

    dispatch(setLocalLoading(false));
}

const getTasksResult = (tasks: ITodoTaskGetDTO[]): TodoTaskGetTasksAction => ({
    type: TODO_TASKS_ACTION_TYPES.GET_TASKS,
    tasks: tasks
})

export const selectTask = (task: ITodoTaskGetDTO): TodoTaskSelectTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.SELECT_TASK,
    task: task,
});

export const unselectTask = (): TodoTaskUnselectTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.SELECT_TASK
});

export const setTasksCreating = (mode: boolean): any => ({
    type: TODO_TASKS_ACTION_TYPES.SET_CREATING,
    payload: mode,
})

export const createTask = (task: ITodoTaskPostDTO) => async (dispatch: any) => {

    dispatch(setLocalLoading(true))

    let result = await TodoTasksApi.Create(task)

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(createTaskResult(result.data!));
        dispatch(setTasksCreating(false));
    }

    dispatch(setLocalLoading(false));
};

const createTaskResult = (task: ITodoTaskPostDTO): TodoTaskCreateTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.CREATE_TASK,
    task: task,
})

export const setTasksEditing = (mode: boolean): any => ({
    type: TODO_TASKS_ACTION_TYPES.SET_EDITING,
    payload: mode,
})

export const editTask = (task: ITodoTaskPutDTO) => async (dispatch: any) => {

    dispatch(setLocalLoading(true))

    let result = await TodoTasksApi.Edit(task)

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(editTaskResult(task));
        dispatch(unselectTask())
    }

    dispatch(setLocalLoading(false));
};

const editTaskResult = (task: ITodoTaskPutDTO): TodoTaskEditTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.EDIT_TASK,
    task: task,
});

export const deleteTask = (task: ITodoTaskGetDTO) => async (dispatch: any) => {
    dispatch(setLocalLoading(true))

    let result = await TodoTasksApi.Delete(task.id.toString())

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(deleteTaskResult(result.data!))
    }

    dispatch(setLocalLoading(false))
}

const deleteTaskResult = (task: ITodoTaskGetDTO): TodoTaskDeleteTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.DELETE_TASK,
    task: task,
})