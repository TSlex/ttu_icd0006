import { TodoCategories, TodoCategoryAction } from "redux/types";
import { TODO_CATEGORIES_ACTION_TYPES } from "./actions";

export const initialState: TodoCategories = {
    categories: [],
    selectedCategory: null,
    categoryCreatingMode: false,
    categoryEditingMode: false,
}

export const todoCategories = (
    state: TodoCategories = initialState,
    action: TodoCategoryAction
) => {

    const newState: TodoCategories = { ...state }

    switch (action.type) {
        case TODO_CATEGORIES_ACTION_TYPES.GET_CATEGORIES:
            return { ...newState, categories: (action as any).categories }

        case TODO_CATEGORIES_ACTION_TYPES.SELECT_CATEGORY:
            return { ...newState, selectedCategory: (action as any).category }

        case TODO_CATEGORIES_ACTION_TYPES.UNSELECT_CATEGORY:
            return { ...newState, selectedCategory: null }

        case TODO_CATEGORIES_ACTION_TYPES.SET_CREATING:
            return { ...newState, categoryCreatingMode: (action as any).payload }

        case TODO_CATEGORIES_ACTION_TYPES.CREATE_CATEGORY:
            newState.categories.push((action as any).category)

            return { ...newState }

        case TODO_CATEGORIES_ACTION_TYPES.SET_EDITING:
            return { ...newState, categoryEditingMode: (action as any).payload }

        case TODO_CATEGORIES_ACTION_TYPES.EDIT_CATEGORY:

            const categoryToUpdate = (action as any).category

            if (newState.selectedCategory) {
                newState.selectedCategory.todoCategoryName = categoryToUpdate.todoCategoryName
                newState.selectedCategory.todoCategorySort = categoryToUpdate.todoCategorySort
            }

            return { ...newState }

        case TODO_CATEGORIES_ACTION_TYPES.DELETE_CATEGORY:

            const categoryToDelete = (action as any).category
            let categoryToDeleteIndex = -1;

            newState.categories.forEach((item, index) => {
                if (item.id === categoryToDelete.id) {
                    categoryToDeleteIndex = index;
                }
            })

            if (categoryToDeleteIndex < 0) return state;

            return {
                ...newState,
                categories: [
                    ...newState.categories.slice(0, categoryToDeleteIndex),
                    ...newState.categories.slice(categoryToDeleteIndex + 1)
                ]
            }

        default: return state;
    }
}