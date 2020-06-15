import { TodoPriorities, TodoPriorityAction } from "redux/types";
import { TodoPrioritiesActions } from "./actions";

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
        case TodoPrioritiesActions.GetPriorities:
        case TodoPrioritiesActions.SelectPriority:
        case TodoPrioritiesActions.UnselectPriority:
        case TodoPrioritiesActions.CreatePriority:
        case TodoPrioritiesActions.EditPriority:
        case TodoPrioritiesActions.DeletePriority:
        default: return state;
    }
}