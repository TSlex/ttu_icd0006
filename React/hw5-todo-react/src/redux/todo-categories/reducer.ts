import { TodoCategories, TodoCategoryAction } from "redux/types";
import { TODO_CATEGORIES_ACTION_TYPES } from "./actions";

export const initialState: TodoCategories = {
    categories: [],
    selectedCategory: null,

    errors: [],
    succMsg: null,
}

export const todoCategories = (
    state: TodoCategories = initialState,
    action: TodoCategoryAction
) => {

    const newState: TodoCategories = {
        categories: state.categories,
        selectedCategory: state.selectedCategory,

        errors: state.errors,
        succMsg: state.succMsg,
    }

    switch (action.type) {
        case TODO_CATEGORIES_ACTION_TYPES.GET_CATEGORIES:
        case TODO_CATEGORIES_ACTION_TYPES.SELECT_CATEGORY:
        case TODO_CATEGORIES_ACTION_TYPES.UNSELECT_CATEGORY:
        case TODO_CATEGORIES_ACTION_TYPES.CREATE_CATEGORY:
        case TODO_CATEGORIES_ACTION_TYPES.EDIT_CATEGORY:
        case TODO_CATEGORIES_ACTION_TYPES.DELETE_CATEGORY:
        default: return state;
    }
}