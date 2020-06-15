export interface ITodoTaskGetDTO extends ITodoTaskPostDTO{
    id: number;
}

export interface ITodoTaskPostDTO {
    todoTaskName: string;
    todoTaskSort: number;

    createdDT: Date;
    dueDT: string | null;

    isCompleted: boolean;
    isArchived: boolean;

    todoCategoryId: number;
    todoPriorityId: number;
}

export interface ITodoTaskPutDTO extends ITodoTaskGetDTO{
}