import { StringifyOptions } from "querystring";

export interface IPost {

  id: string

  createdBy: string | null
  createdAt: number

  changedBy: string | null
  changedAt: number

  deletedBy: string | null
  deletedAt: number | null

  postTitle: string
  postImageUrl: string | null
  postDescription: string | null

  postPublicationDateTime: number

  postFavoritesCount: number
  postCommentsCount: number

  profileId: string
}
