import { ITodoCategoryGetDTO } from 'types/ITodoCategoryDTO';
import { ITodoTaskGetDTO } from 'types/ITodoTaskDTO';
import { ITodoPriorityGetDTO } from 'types/ITodoPriorityDTO';

// -------------State-------------

// notification

export type Notification = {
    errors: string[];
    succMsg: string | null;
}

// loading system

export type LoadingSystem = {
    isGlobalLoaded: boolean;
    isGlobalLoading: boolean;

    isLocalLoaded: boolean;
    isLocalLoading: boolean;

    isRedirecting: boolean;
}

// account
export type Account = {
    jwt: string | null;
    username: string | null;
    expired: number;

    isAuthenticated: boolean;
    isLoading: boolean;
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
    notification: Notification,
    loadingSystem: LoadingSystem,
    account: Account;
    todoTasks: TodoTasks;
    todoCategories: TodoCategories;
    todoPriorities: TodoPriorities;
}

// -------------Actions-------------

// common
type BaseAction = {
    type: string
}

// load system

export type LoadingSystemSetGlobalLoadingAction = {
    payload: boolean,
} & BaseAction

export type LoadingSystemSetGlobalLoadedAction = {
    payload: boolean,
} & BaseAction

export type LoadingSystemSetLocalLoadingAction = {
    payload: boolean,
} & BaseAction

export type LoadingSystemSetLocalLoadedAction = {
    payload: boolean,
} & BaseAction

export type LoadingSystemSetRedirectingAction = {
    payload: boolean,
} & BaseAction

export type LoadingSystemAction =
    LoadingSystemSetGlobalLoadingAction |
    LoadingSystemSetGlobalLoadedAction |
    LoadingSystemSetLocalLoadingAction |
    LoadingSystemSetLocalLoadedAction |
    LoadingSystemSetRedirectingAction

// notification

export type NotificationCrearNotificationsAction = {
} & BaseAction

export type NotificationSetErrorsAction = {
    errors: string[]
} & BaseAction

export type NotificationSetSuccMsgAction = {
    msg: string | null
} & BaseAction

export type NotificationAction =
    NotificationCrearNotificationsAction |
    NotificationSetErrorsAction |
    NotificationSetSuccMsgAction

// account
export type AccountLoginAction = {
    jwt: string | null
} & BaseAction

export type AccountLogoutAction = {
} & BaseAction

export type AccountRegisterAction = {
} & BaseAction

export type AccountLoadUserAction = {
} & BaseAction

export type AccountSetLoadingAction = {
    payload: boolean,
} & BaseAction

export type AccountSetAuthAction = {
    payload: boolean,
} & BaseAction

export type AccountAction =
    AccountLoginAction |
    AccountLogoutAction |
    AccountRegisterAction |
    AccountLoadUserAction |
    AccountSetLoadingAction |
    AccountSetAuthAction


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