export interface ICommentGetDTO {
  id: string;
  userName: string;
  profileAvatarId: string | null;
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
