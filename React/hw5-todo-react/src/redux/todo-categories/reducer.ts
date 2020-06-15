import { TodoCategories, TodoCategoryAction } from "redux/types";
import { TodoCategoriesActions } from "./actions";

export const initialState: TodoCategories = {
    categories: [],
    selectedCategory: null
}

export const todoCategories = (
    state: TodoCategories = initialState,
    action: TodoCategoryAction
) => {

    const newState: TodoCategories = {
        categories: state.categories,
        selectedCategory: state.selectedCategory,
    }

    switch (action.type) {
        case TodoCategoriesActions.GetCategories:
        case TodoCategoriesActions.SelectCategory:
        case TodoCategoriesActions.UnselectCategory:
        case TodoCategoriesActions.CreateCategory:
        case TodoCategoriesActions.EditCategory:
        case TodoCategoriesActions.DeleteCategory:
        default: return state;
    }
}