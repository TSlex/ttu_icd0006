import {
    TodoPriorityGetPrioritiesAction,
    TodoPrioritySelectPriorityAction,
    TodoPriorityUnselectPriorityAction,
    TodoPriorityCreatePriorityAction,
    TodoPriorityEditPriorityAction,
    TodoPriorityDeletePriorityAction,
} from 'redux/types';

import { ITodoPriorityGetDTO, ITodoPriorityPutDTO, ITodoPriorityPostDTO } from "types/ITodoPriorityDTO";
import { setLocalLoading } from 'redux/loading-system/actions';
import TodoPrioritiesApi from 'services/TodoPrioritiesApi';
import { setErrors } from 'redux/notification/actions';

export enum TODO_PRIORITIES_ACTION_TYPES {
    GET_PRIORITIES = "TODO_PRIORITIES:GET_PRIORITIES",

    SELECT_PRIORITY = "TODO_PRIORITIES:SELECT_PRIORITY",
    UNSELECT_PRIORITY = "TODO_PRIORITIES:UNSELECT_PRIORITY",

    SET_CREATING = "TODO_PRIORITIES:SET_CREATING",
    CREATE_PRIORITY = "TODO_PRIORITIES:CREATE_PRIORITY",
    CREATE_PRIORITY_SUCC = "TODO_PRIORITIES:CREATE_PRIORITY_SUCC",
    CREATE_PRIORITY_FAIL = "TODO_PRIORITIES:CREATE_PRIORITY_FAIL",

    SET_EDITING = "TODO_PRIORITIES:SET_EDITING",
    EDIT_PRIORITY = "TODO_PRIORITIES:EDIT_PRIORITY",
    EDIT_PRIORITY_SUCC = "TODO_PRIORITIES:EDIT_PRIORITY_SUCC",
    EDIT_PRIORITY_FAIL = "TODO_PRIORITIES:EDIT_PRIORITY_FAIL",

    DELETE_PRIORITY = "TODO_PRIORITIES:DELETE_PRIORITY",
}

export const getPriorities = () => async (dispatch: any) => {

    dispatch(setLocalLoading(true))

    let result = await TodoPrioritiesApi.Index()

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(getPrioritiesResult(result.data!));
    }

    dispatch(setLocalLoading(false));
}

const getPrioritiesResult = (priorities: ITodoPriorityGetDTO[]): TodoPriorityGetPrioritiesAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.GET_PRIORITIES,
    priorities: priorities
})

export const selectPriority = (priority: ITodoPriorityGetDTO): TodoPrioritySelectPriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.SELECT_PRIORITY,
    priority: priority,
});

export const unselectPriority = (): TodoPriorityUnselectPriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.SELECT_PRIORITY
});

export const setPrioritiesCreating = (mode: boolean): any => ({
    type: TODO_PRIORITIES_ACTION_TYPES.SET_CREATING,
    payload: mode,
})

export const createPriority = (priority: ITodoPriorityPostDTO) => async (dispatch: any) => {

    dispatch(setLocalLoading(true))

    let result = await TodoPrioritiesApi.Create(priority)

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(createPriorityResult(result.data!));
        dispatch(setPrioritiesCreating(false));
    }

    dispatch(setLocalLoading(false));
};

const createPriorityResult = (priority: ITodoPriorityPostDTO): TodoPriorityCreatePriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.CREATE_PRIORITY,
    priority: priority,
})

export const setPrioritiesEditing = (mode: boolean): any => ({
    type: TODO_PRIORITIES_ACTION_TYPES.SET_EDITING,
    payload: mode,
})

export const editPriority = (priority: ITodoPriorityPutDTO) => async (dispatch: any) => {

    dispatch(setLocalLoading(true))

    let result = await TodoPrioritiesApi.Edit(priority)

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(editPriorityResult(priority));
        dispatch(unselectPriority())
    }

    dispatch(setLocalLoading(false));
};

const editPriorityResult = (priority: ITodoPriorityPutDTO): TodoPriorityEditPriorityAction => ({
    type: TODO_PRIORITIES_ACTION_TYPES.EDIT_PRIORITY,
    priority: priority,
});

export const deletePriority = (priority: ITodoPriorityGetDTO) => async (dispatch: any) => {
    dispatch(setLocalLoading(true))

    let result = await TodoPrioritiesApi.Delete(priority.id.toString())

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(deletePriorityResult(result.data!))
    }

    dispatch(setLocalLoading(false))
}

const deletePriorityResult = (priority: ITodoPriorityGetDTO): any => ({
    type: TODO_PRIORITIES_ACTION_TYPES.DELETE_PRIORITY,
    priority: priority,
})