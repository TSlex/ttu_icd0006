import {
    TodoCategoryGetCategoriesAction,
    TodoCategorySelectCategoryAction,
    TodoCategoryUnselectCategoryAction,
    TodoCategoryCreateCategoryAction,
    TodoCategoryEditCategoryAction,
    TodoCategoryDeleteCategoryAction,
} from 'redux/types';

import { ITodoCategoryGetDTO } from "types/ITodoCategoryDTO";

export enum TODO_CATEGORIES_ACTION_TYPES {
    GET_CATEGORIES = "TODO_CATEGORIES:GET_CATEGORIES",

    SELECT_CATEGORY = "TODO_CATEGORIES:SELECT_CATEGORY",
    UNSELECT_CATEGORY = "TODO_CATEGORIES:UNSELECT_CATEGORY",

    CREATE_CATEGORY = "TODO_CATEGORIES:CREATE_CATEGORY",
    EDIT_CATEGORY = "TODO_CATEGORIES:EDIT_CATEGORY",
    DELETE_CATEGORY = "TODO_CATEGORIES:DELETE_CATEGORY",
}

export const getCategories = (): TodoCategoryGetCategoriesAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.GET_CATEGORIES,
    categories: []
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