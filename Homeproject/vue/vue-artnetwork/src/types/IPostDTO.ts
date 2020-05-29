export interface IPostDTO {
  id: string;
  postTitle: string;
  postDescription: string;
  profileUsername: string;
  postImageId: string;
  postPublicationDateTime: Date;
  postFavoritesCount: number;
  postCommentsCount: number;
  isFavorite: boolean;
}

export interface IPostPostDTO {
  id: string,
  postTitle: string;
  postDescription: string;
  postImageId: string;
}

export interface IPostPutDTO {
  id: string;
  postTitle: string;
  postDescription: string;
}
