export interface ICommentDTO {
  id: string;
  userName: string;
  profileAvatarUrl: string;
  commentValue: string;
  commentDateTime: Date;
}

export interface ICommentPostDTO {
  postId: string;
  commentValue: string;
}

export interface ICommentPutDTO {
  id: string;
  commentValue: string;
}