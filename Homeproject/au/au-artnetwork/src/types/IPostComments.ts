import { IPostGetDTO } from "./IPostDTO"; 
import { ICommentGetDTO } from "./ICommentDTO";

export interface IPostComments {
    post: IPostGetDTO,
    comments: ICommentGetDTO[],
}
