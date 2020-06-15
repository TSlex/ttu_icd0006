import {
    TodoPriorityGetPrioritiesAction,
    TodoPrioritySelectPriorityAction,
    TodoPriorityCreatePriorityAction,
    TodoPriorityEditPriorityAction,
    TodoPriorityDeletePriorityAction
} from 'redux/types';

import { ITodoPriorityGetDTO } from "types/ITodoPriorityDTO";

export enum TodoPrioritiesActions {
    GetPriorities = "TodoPriorities:GetPriorities",
    SelectPriority = "TodoPriorities:SelectPriority",
    CreatePriority = "TodoPriorities:CreatePriority",
    EditPriority = "TodoPriorities:EditPriority",
    DeletePriority = "TodoPriorities:DeletePriority"
}

export const getPriorities = (): TodoPriorityGetPrioritiesAction => ({
    type: TodoPrioritiesActions.GetPriorities
});

export const selectPriority = (priority: ITodoPriorityGetDTO): TodoPrioritySelectPriorityAction => ({
    priority: priority,
    type: TodoPrioritiesActions.SelectPriority
});

export const createPriority = (priority: ITodoPriorityGetDTO): TodoPriorityCreatePriorityAction => ({
    priority: priority,
    type: TodoPrioritiesActions.CreatePriority
});

export const editPriority = (priority: ITodoPriorityGetDTO): TodoPriorityEditPriorityAction => ({
    priority: priority,
    type: TodoPrioritiesActions.EditPriority
});

export const deletePriority = (priority: ITodoPriorityGetDTO): TodoPriorityDeletePriorityAction => ({
    priority: priority,
    type: TodoPrioritiesActions.DeletePriority
});