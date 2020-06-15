export interface ITodoCategoryGetDTO extends ITodoCategoryPostDTO{
    id: number;
}

export interface ITodoCategoryPostDTO {
    todoCategoryName: string;
    todoCategorySort: number;
}

export interface ITodoCategoryPutDTO extends ITodoCategoryGetDTO {
}