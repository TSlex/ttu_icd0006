export interface IPostDTO {
  id: string;
  postTitle: string;
  postDescription: string;
  postImageId: string;
  postImageUrl: string;
  postPublicationDateTime: Date;
  postFavoritesCount: number;
  postCommentsCount: number;
  isFavorite: boolean;
}
