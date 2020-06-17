import { TodoPriorities, TodoPriorityAction } from "redux/types";
import { TODO_PRIORITIES_ACTION_TYPES } from "./actions";

export const initialState: TodoPriorities = {
    priorities: [],
    selectedPriority: null,
}

export const todoPriorities = (
    state: TodoPriorities = initialState,
    action: TodoPriorityAction
) => {

    const newState: TodoPriorities = {
        priorities: state.priorities,
        selectedPriority: state.selectedPriority,
    }

    switch (action.type) {
        case TODO_PRIORITIES_ACTION_TYPES.GET_PRIORITIES:
        case TODO_PRIORITIES_ACTION_TYPES.SELECT_PRIORITY:
        case TODO_PRIORITIES_ACTION_TYPES.UNSELECT_PRIORITY:
        case TODO_PRIORITIES_ACTION_TYPES.CREATE_PRIORITY:
        case TODO_PRIORITIES_ACTION_TYPES.EDIT_PRIORITY:
        case TODO_PRIORITIES_ACTION_TYPES.DELETE_PRIORITY:
        default: return state;
    }
}