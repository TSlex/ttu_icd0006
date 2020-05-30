import { DomainEntityBaseMetaSoftUpdateDelete } from '@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete'

export interface IPostDTO {
  id: string;
  postTitle: string;
  postDescription: string | null;
  profileUsername: string;
  postImageId: string | null;
  postPublicationDateTime: Date;
  postFavoritesCount: number;
  postCommentsCount: number;
  isFavorite: boolean;
}

export interface IPostPostDTO {
  id: string,
  postTitle: string;
  postDescription: string | null;
  postImageId: string | null;
}

export interface IPostPutDTO {
  id: string;
  postTitle: string;
  postDescription: string | null;
}

export interface IPostAdminDTO extends DomainEntityBaseMetaSoftUpdateDelete {
  postTitle: string;
  postImageId: string | null;
  postDescription: string | null;
  postPublicationDateTime: Date;
  postFavoritesCount: number;
  postCommentsCount: number;
  profileId: string;
}
