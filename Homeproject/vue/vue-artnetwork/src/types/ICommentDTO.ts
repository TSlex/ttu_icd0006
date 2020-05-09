export interface ICommentDTO {
  id: string;
  userName: string;
  profileAvatarUrl: string;
  commentValue: string;
  commentDateTime: Date;

  errors: string[];
}