import {
    TodoCategoryGetCategoriesAction,
    TodoCategorySelectCategoryAction,
    TodoCategoryUnselectCategoryAction,
    TodoCategoryCreateCategoryAction,
    TodoCategoryEditCategoryAction,
    TodoCategoryDeleteCategoryAction,
    CrearNotificationsAction,
    SetErrorsAction,
    SetSuccMsgAction,
} from 'redux/types';

import { ITodoCategoryGetDTO } from "types/ITodoCategoryDTO";

export enum TODO_CATEGORIES_ACTION_TYPES {
    GET_CATEGORIES = "TODO_CATEGORIES:GET_CATEGORIES",

    SELECT_CATEGORY = "TODO_CATEGORIES:SELECT_CATEGORY",
    UNSELECT_CATEGORY = "TODO_CATEGORIES:UNSELECT_CATEGORY",

    CREATE_CATEGORY = "TODO_CATEGORIES:CREATE_CATEGORY",
    EDIT_CATEGORY = "TODO_CATEGORIES:EDIT_CATEGORY",
    DELETE_CATEGORY = "TODO_CATEGORIES:DELETE_CATEGORY",

    CLEAR_NOTIFICATION = "TODO_CATEGORIES:CLEAR_NOTIFICATION",
    SET_ERRORS = "TODO_CATEGORIES:SET_ERRORS",
    SET_SUCC_MSG = "TODO_CATEGORIES:SET_SUCC_MSG",
}

export const getCategories = (): TodoCategoryGetCategoriesAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.GET_CATEGORIES
});

export const selectCategory = (category: ITodoCategoryGetDTO): TodoCategorySelectCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.SELECT_CATEGORY,
    category: category,
});

export const unselectCategory = (): TodoCategoryUnselectCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.SELECT_CATEGORY
});

export const createCategory = (category: ITodoCategoryGetDTO): TodoCategoryCreateCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.CREATE_CATEGORY,
    category: category,
});

export const editCategory = (category: ITodoCategoryGetDTO): TodoCategoryEditCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.EDIT_CATEGORY,
    category: category,
});

export const deleteCategory = (category: ITodoCategoryGetDTO): TodoCategoryDeleteCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.DELETE_CATEGORY,
    category: category,
});

// Notifications

export const crearNotifications = (): CrearNotificationsAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.CLEAR_NOTIFICATION,
});

export const setErrors = (): SetErrorsAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.SET_ERRORS,
});

export const setSuccMsg = (): SetSuccMsgAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.SET_SUCC_MSG,
});