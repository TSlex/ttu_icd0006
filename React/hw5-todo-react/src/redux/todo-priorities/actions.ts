import {
    TodoPriorityGetPrioritiesAction,
    TodoPrioritySelectPriorityAction,
    TodoPriorityUnselectPriorityAction,
    TodoPriorityCreatePriorityAction,
    TodoPriorityEditPriorityAction,
    TodoPriorityDeletePriorityAction,
} from 'redux/types';

import { ITodoPriorityGetDTO } from "types/ITodoPriorityDTO";

export enum TODO_PRIORITIES_ACTION_TYPES {
    GET_PRIORITIES = "TODO_PRIORITIES:GET_PRIORITIES",

    SELECT_PRIORITY = "TODO_PRIORITIES:SELECT_PRIORITY",
    UNSELECT_PRIORITY = "TODO_PRIORITIES:UNSELECT_PRIORITY",

    CREATE_PRIORITY = "TODO_PRIORITIES:CREATE_PRIORITY",
    EDIT_PRIORITY = "TODO_PRIORITIES:EDIT_PRIORITY",
    DELETE_PRIORITY = "TODO_PRIORITIES:DELETE_PRIORITY",
}

export const getPriorities = (): TodoPriorityGetPrioritiesAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.GET_PRIORITIES
});

export const selectPriority = (priority: ITodoPriorityGetDTO): TodoPrioritySelectPriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.SELECT_PRIORITY,
    priority: priority,
});

export const unselectPriority = (): TodoPriorityUnselectPriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.SELECT_PRIORITY
});

export const createPriority = (priority: ITodoPriorityGetDTO): TodoPriorityCreatePriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.CREATE_PRIORITY,
    priority: priority,
});

export const editPriority = (priority: ITodoPriorityGetDTO): TodoPriorityEditPriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.EDIT_PRIORITY,
    priority: priority,
});

export const deletePriority = (priority: ITodoPriorityGetDTO): TodoPriorityDeletePriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.DELETE_PRIORITY,
    priority: priority,
});