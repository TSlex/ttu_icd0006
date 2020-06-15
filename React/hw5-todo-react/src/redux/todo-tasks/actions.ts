import {
    TodoTaskGetTasksAction,
    TodoTaskSelectTaskAction,
    TodoTaskCreateTaskAction,
    TodoTaskEditTaskAction,
    TodoTaskDeleteTaskAction
} from 'redux/types';

import { ITodoTaskGetDTO } from "types/ITodoTaskDTO";

export enum TodoTasksActions {
    GetTasks = "TodoTasks:GetTasks",
    SelectTask = "TodoTasks:SelectTask",
    CreateTask = "TodoTasks:CreateTask",
    EditTask = "TodoTasks:EditTask",
    DeleteTask = "TodoTasks:DeleteTask"
}

export const getTasks = (): TodoTaskGetTasksAction => ({
    type: TodoTasksActions.GetTasks
});

export const selectTask = (task: ITodoTaskGetDTO): TodoTaskSelectTaskAction => ({
    task: task,
    type: TodoTasksActions.SelectTask
});

export const createTask = (task: ITodoTaskGetDTO): TodoTaskCreateTaskAction => ({
    task: task,
    type: TodoTasksActions.CreateTask
});

export const editTask = (task: ITodoTaskGetDTO): TodoTaskEditTaskAction => ({
    task: task,
    type: TodoTasksActions.EditTask
});

export const deleteTask = (task: ITodoTaskGetDTO): TodoTaskDeleteTaskAction => ({
    task: task,
    type: TodoTasksActions.DeleteTask
});