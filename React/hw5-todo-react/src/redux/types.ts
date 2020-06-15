import { ITodoCategoryGetDTO } from 'types/ITodoCategoryDTO';
import { ITodoTaskGetDTO } from 'types/ITodoTaskDTO';
import { ITodoPriorityGetDTO } from 'types/ITodoPriorityDTO';

// -------------State-------------

// account
export type Account = {
    jwt: string | null;
    username: string | null;
    expired: number;
}

// tasks
export type TodoTasks = {
    tasks: ITodoTaskGetDTO[];
    selectedTask: ITodoTaskGetDTO | null;
}

// categories
export type TodoCategories = {
    categories: ITodoCategoryGetDTO[];
    selectedCategory: ITodoCategoryGetDTO | null;
}

// priorities
export type TodoPriorities = {
    priorities: ITodoPriorityGetDTO[];
    selectedPriority: ITodoPriorityGetDTO | null;
}

export type AppState = {
    account: Account;
    todoTasks: TodoTasks;
    todoCategories: TodoCategories;
    todoPriorities: TodoPriorities;
}

// -------------Actions-------------

type BaseAction = {
    type: string
}


// account
export type AccountLoginAction = {
} & BaseAction

export type AccountLogoutAction = {
} & BaseAction

export type AccountRegisterAction = {
} & BaseAction

export type AccountAction =
    AccountLoginAction |
    AccountLogoutAction |
    AccountRegisterAction


// tasks
export type TodoTaskBaseAction = {
    task: ITodoTaskGetDTO
}

export type TodoTaskGetTasksAction = {
} & BaseAction

export type TodoTaskSelectTaskAction = {
} & BaseAction & TodoTaskBaseAction

export type TodoTaskUnselectTaskAction = {
} & BaseAction

export type TodoTaskCreateTaskAction = {
} & BaseAction & TodoTaskBaseAction

export type TodoTaskEditTaskAction = {
} & BaseAction & TodoTaskBaseAction

export type TodoTaskDeleteTaskAction = {
} & BaseAction & TodoTaskBaseAction

export type TodoTaskAction =
    TodoTaskGetTasksAction |
    TodoTaskSelectTaskAction |
    TodoTaskUnselectTaskAction |
    TodoTaskCreateTaskAction |
    TodoTaskEditTaskAction |
    TodoTaskDeleteTaskAction


// categories
export type TodoCategoryBaseAction = {
    category: ITodoCategoryGetDTO
}

export type TodoCategoryGetCategoriesAction = {
} & BaseAction

export type TodoCategorySelectCategoryAction = {
} & BaseAction & TodoCategoryBaseAction

export type TodoCategoryUnselectCategoryAction = {
} & BaseAction

export type TodoCategoryCreateCategoryAction = {
} & BaseAction & TodoCategoryBaseAction

export type TodoCategoryEditCategoryAction = {
} & BaseAction & TodoCategoryBaseAction

export type TodoCategoryDeleteCategoryAction = {
} & BaseAction & TodoCategoryBaseAction

export type TodoCategoryAction =
    TodoCategoryGetCategoriesAction |
    TodoCategorySelectCategoryAction |
    TodoCategoryUnselectCategoryAction |
    TodoCategoryCreateCategoryAction |
    TodoCategoryEditCategoryAction |
    TodoCategoryDeleteCategoryAction


// priorities
export type TodoPriorityBaseAction = {
    priority: ITodoPriorityGetDTO
}

export type TodoPriorityGetPrioritiesAction = {
} & BaseAction

export type TodoPrioritySelectPriorityAction = {
} & BaseAction & TodoPriorityBaseAction

export type TodoPriorityUnselectPriorityAction = {
} & BaseAction

export type TodoPriorityCreatePriorityAction = {
} & BaseAction & TodoPriorityBaseAction

export type TodoPriorityEditPriorityAction = {
} & BaseAction & TodoPriorityBaseAction

export type TodoPriorityDeletePriorityAction = {
} & BaseAction & TodoPriorityBaseAction

export type TodoPriorityAction =
    TodoPriorityGetPrioritiesAction |
    TodoPrioritySelectPriorityAction |
    TodoPriorityUnselectPriorityAction |
    TodoPriorityCreatePriorityAction |
    TodoPriorityEditPriorityAction |
    TodoPriorityDeletePriorityAction