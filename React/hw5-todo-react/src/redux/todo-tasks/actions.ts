import {
    TodoTaskGetTasksAction,
    TodoTaskSelectTaskAction,
    TodoTaskUnselectTaskAction,
    TodoTaskCreateTaskAction,
    TodoTaskEditTaskAction,
    TodoTaskDeleteTaskAction,
} from 'redux/types';

import { ITodoTaskGetDTO } from "types/ITodoTaskDTO";

export enum TODO_TASKS_ACTION_TYPES {
    GET_TASKS = "TODO_TASKS:GET_TASKS",

    SELECT_TASK = "TODO_TASKS:SELECT_TASK",
    UNSELECT_TASK = "TODO_TASKS:UNSELECT_TASK",

    CREATE_TASK = "TODO_TASKS:CREATE_TASK",
    EDIT_TASK = "TODO_TASKS:EDIT_TASK",
    DELETE_TASK = "TODO_TASKS:DELETE_TASK",
}

export const getTasks = (): TodoTaskGetTasksAction => ({
    type: TODO_TASKS_ACTION_TYPES.GET_TASKS,
    tasks: []
});

export const selectTask = (task: ITodoTaskGetDTO): TodoTaskSelectTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.SELECT_TASK,
    task: task,
});

export const unselectTask = (): TodoTaskUnselectTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.SELECT_TASK
});

export const createTask = (task: ITodoTaskGetDTO): TodoTaskCreateTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.CREATE_TASK,
    task: task,
});

export const editTask = (task: ITodoTaskGetDTO): TodoTaskEditTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.EDIT_TASK,
    task: task,
});

export const deleteTask = (task: ITodoTaskGetDTO): TodoTaskDeleteTaskAction => ({
    type: TODO_TASKS_ACTION_TYPES.DELETE_TASK,
    task: task,
});