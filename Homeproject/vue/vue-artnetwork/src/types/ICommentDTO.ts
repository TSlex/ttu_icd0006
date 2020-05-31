import { DomainEntityBaseMetaSoftUpdateDelete } from '@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete'

export interface ICommentDTO {
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

export interface ICommentAdminDTO extends DomainEntityBaseMetaSoftUpdateDelete{
  commentValue: string;
  commentDateTime: Date;
  profileId: string;
  postId: string;
}
