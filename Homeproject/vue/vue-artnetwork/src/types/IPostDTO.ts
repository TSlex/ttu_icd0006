export interface IPostDTO {
  id: string;
  postTitle: string;
  postDescription: string;
  profileUsername: string;
  postImageId: string;
  postImageUrl: string;
  postPublicationDateTime: Date;
  postFavoritesCount: number;
  postCommentsCount: number;
  isFavorite: boolean;
}

export interface IPostPostDTO {
  postTitle: string;
  postDescription: string;
  postImageId: string | null;
  postImageUrl: string;
}

export interface IPostPutDTO {
  id: string;
  postTitle: string;
  postDescription: string;
}
