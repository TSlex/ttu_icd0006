import {
    TodoCategoryGetCategoriesAction,
    TodoCategorySelectCategoryAction,
    TodoCategoryUnselectCategoryAction,
    TodoCategoryCreateCategoryAction,
    TodoCategoryEditCategoryAction,
    TodoCategoryDeleteCategoryAction,
} from 'redux/types';

import { ITodoCategoryGetDTO, ITodoCategoryPostDTO, ITodoCategoryPutDTO } from "types/ITodoCategoryDTO";
import { setLocalLoading } from 'redux/loading-system/actions';
import TodoCategoriesApi from 'services/TodoCategoriesApi';
import { setErrors } from 'redux/notification/actions';

export enum TODO_CATEGORIES_ACTION_TYPES {
    GET_CATEGORIES = "TODO_CATEGORIES:GET_CATEGORIES",

    SELECT_CATEGORY = "TODO_CATEGORIES:SELECT_CATEGORY",
    UNSELECT_CATEGORY = "TODO_CATEGORIES:UNSELECT_CATEGORY",

    SET_CREATING = "TODO_CATEGORIES:SET_EDITING",
    CREATE_CATEGORY = "TODO_CATEGORIES:CREATE_CATEGORY",

    SET_EDITING = "TODO_CATEGORIES:SET_EDITING",
    EDIT_CATEGORY = "TODO_CATEGORIES:EDIT_CATEGORY",

    DELETE_CATEGORY = "TODO_CATEGORIES:DELETE_CATEGORY",
}

export const getCategories = () => async (dispatch: any) => {

    dispatch(setLocalLoading(true))

    let result = await TodoCategoriesApi.Index()

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(getCategoriesResult(result.data!));
    }

    dispatch(setLocalLoading(false));
}

const getCategoriesResult = (categories: ITodoCategoryGetDTO[]): TodoCategoryGetCategoriesAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.GET_CATEGORIES,
    categories: categories
})

export const selectCategory = (category: ITodoCategoryGetDTO): TodoCategorySelectCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.SELECT_CATEGORY,
    category: category,
});

export const unselectCategory = (): TodoCategoryUnselectCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.SELECT_CATEGORY
});

export const setCategoriesCreating = (mode: boolean): any => ({
    type: TODO_CATEGORIES_ACTION_TYPES.SET_CREATING,
    payload: mode,
})

export const createCategory = (category: ITodoCategoryPostDTO) => async (dispatch: any) => {

    dispatch(setLocalLoading(true))

    let result = await TodoCategoriesApi.Create(category)

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(createCategoryResult(result.data!));
        dispatch(setCategoriesCreating(false));
    }

    dispatch(setLocalLoading(false));
};

const createCategoryResult = (category: ITodoCategoryPostDTO): TodoCategoryCreateCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.CREATE_CATEGORY,
    category: category,
})

export const setCategoriesEditing = (mode: boolean): any => ({
    type: TODO_CATEGORIES_ACTION_TYPES.SET_EDITING,
    payload: mode,
})

export const editCategory = (category: ITodoCategoryPutDTO) => async (dispatch: any) => {

    dispatch(setLocalLoading(true))

    let result = await TodoCategoriesApi.Edit(category)

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(editCategoryResult(category));
        dispatch(unselectCategory())
    }

    dispatch(setLocalLoading(false));
};

const editCategoryResult = (category: ITodoCategoryPutDTO): TodoCategoryEditCategoryAction => ({
    type: TODO_CATEGORIES_ACTION_TYPES.EDIT_CATEGORY,
    category: category,
});


export const deleteCategory = (category: ITodoCategoryGetDTO) => async (dispatch: any) => {
    dispatch(setLocalLoading(true))

    let result = await TodoCategoriesApi.Delete(category.id.toString())

    if (result.errors?.length > 0) {
        dispatch(setErrors(result.errors));

    } else {
        dispatch(deleteCategoryResult(result.data!))
    }

    dispatch(setLocalLoading(false))
}

const deleteCategoryResult = (category: ITodoCategoryGetDTO): any => ({
    type: TODO_CATEGORIES_ACTION_TYPES.DELETE_CATEGORY,
    category: category,
})