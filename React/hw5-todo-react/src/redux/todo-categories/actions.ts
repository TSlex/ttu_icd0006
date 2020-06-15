import {
    TodoCategoryGetCategoriesAction,
    TodoCategorySelectCategoryAction,
    TodoCategoryCreateCategoryAction,
    TodoCategoryEditCategoryAction,
    TodoCategoryDeleteCategoryAction
} from 'redux/types';

import { ITodoCategoryGetDTO } from "types/ITodoCategoryDTO";

export enum TodoCategoriesActions {
    GetCategories = "TodoCategories:GetCategories",
    SelectCategory = "TodoCategories:SelectCategory",
    CreateCategory = "TodoCategories:CreateCategory",
    EditCategory = "TodoCategories:EditCategory",
    DeleteCategory = "TodoCategories:DeleteCategory"
}

export const getCategories = (): TodoCategoryGetCategoriesAction => ({
    type: TodoCategoriesActions.GetCategories
});

export const selectCategory = (category: ITodoCategoryGetDTO): TodoCategorySelectCategoryAction => ({
    category: category,
    type: TodoCategoriesActions.SelectCategory
});

export const createCategory = (category: ITodoCategoryGetDTO): TodoCategoryCreateCategoryAction => ({
    category: category,
    type: TodoCategoriesActions.CreateCategory
});

export const editCategory = (category: ITodoCategoryGetDTO): TodoCategoryEditCategoryAction => ({
    category: category,
    type: TodoCategoriesActions.EditCategory
});

export const deleteCategory = (category: ITodoCategoryGetDTO): TodoCategoryDeleteCategoryAction => ({
    category: category,
    type: TodoCategoriesActions.DeleteCategory
});