export interface ITodoPriorityGetDTO extends ITodoPriorityPostDTO{
    id: number;
}

export interface ITodoPriorityPostDTO {
    todoPriorityName: string;
    todoPrioritySort: number;
}

export interface ITodoPriorityPutDTO extends ITodoPriorityGetDTO {
}