import { ITodoPriorityGetDTO } from './../../types/ITodoPriorityDTO';
import { TodoPriorities, TodoPriorityAction } from "redux/types";
import { TODO_PRIORITIES_ACTION_TYPES } from "./actions";

export const initialState: TodoPriorities = {
    // priorities: [],
    priorities: {},
    selectedPriority: null,
    priorityCreatingMode: false,
    priorityEditingMode: false,
}

export const todoPriorities = (
    state: TodoPriorities = initialState,
    action: TodoPriorityAction
): TodoPriorities => {

    const newState: TodoPriorities = { ...state }

    switch (action.type) {
        case TODO_PRIORITIES_ACTION_TYPES.GET_PRIORITIES:
            const priorities: Record<string, ITodoPriorityGetDTO> = {};

            ((action as any).priorities as ITodoPriorityGetDTO[]).forEach(
                (item) => { priorities[item.id] = item }
            )

            return { ...newState, priorities: priorities }

        case TODO_PRIORITIES_ACTION_TYPES.SELECT_PRIORITY:
            return { ...newState, selectedPriority: (action as any).priority }

        case TODO_PRIORITIES_ACTION_TYPES.UNSELECT_PRIORITY:
            return { ...newState, selectedPriority: null }

        case TODO_PRIORITIES_ACTION_TYPES.SET_CREATING:
            return { ...newState, priorityCreatingMode: (action as any).payload }

        case TODO_PRIORITIES_ACTION_TYPES.CREATE_PRIORITY:
            // newState.priorities.push((action as any).priority)

            const priorityToCreate = (action as any).priority

            newState.priorities[priorityToCreate.id] = priorityToCreate

            return { ...newState }

        case TODO_PRIORITIES_ACTION_TYPES.SET_EDITING:
            return { ...newState, priorityEditingMode: (action as any).payload }

        case TODO_PRIORITIES_ACTION_TYPES.EDIT_PRIORITY:

            const priorityToUpdate = (action as any).priority

            if (newState.selectedPriority) {
                newState.selectedPriority.todoPriorityName = priorityToUpdate.todoPriorityName
                newState.selectedPriority.todoPrioritySort = priorityToUpdate.todoPrioritySort
            }

            return { ...newState }

        case TODO_PRIORITIES_ACTION_TYPES.DELETE_PRIORITY:

            const priorityToDelete = (action as any).priority

            delete newState.priorities[priorityToDelete.id]

            return { ...newState, priorities: { ...newState.priorities } }

        // let priorityToDeleteIndex = -1;

        // newState.priorities.forEach((item, index) => {
        //     if (item.id === priorityToDelete.id) {
        //         priorityToDeleteIndex = index;
        //     }
        // })

        // if (priorityToDeleteIndex < 0) return state;

        // return {
        //     ...newState,
        //     priorities: [
        //         ...newState.priorities.slice(0, priorityToDeleteIndex),
        //         ...newState.priorities.slice(priorityToDeleteIndex + 1)
        //     ]
        // }

        default: return state;
    }
}