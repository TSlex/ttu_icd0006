import { TodoPriorities, TodoPriorityAction } from "redux/types";
import { TODO_PRIORITIES_ACTION_TYPES } from "./actions";

export const initialState: TodoPriorities = {
    priorities: [],
    selectedPriority: null,
}

export const todoPriorities = (
    state: TodoPriorities = initialState,
    action: TodoPriorityAction
): TodoPriorities => {

    const newState: TodoPriorities = { ...state }

    switch (action.type) {
        case TODO_PRIORITIES_ACTION_TYPES.GET_PRIORITIES:
            return { ...newState, priorities: (action as any).priorities }
        case TODO_PRIORITIES_ACTION_TYPES.SELECT_PRIORITY:
            return { ...newState, selectedPriority: (action as any).priority }
        case TODO_PRIORITIES_ACTION_TYPES.UNSELECT_PRIORITY:
            return { ...newState, selectedPriority: null }
        case TODO_PRIORITIES_ACTION_TYPES.CREATE_PRIORITY:
        case TODO_PRIORITIES_ACTION_TYPES.EDIT_PRIORITY:
        case TODO_PRIORITIES_ACTION_TYPES.DELETE_PRIORITY:
        default: return state;
    }
}