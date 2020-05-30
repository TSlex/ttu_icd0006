import { DomainEntityBaseMetadata} from '@/types/Domain/DomainEntityBaseMetadata'

export interface IFavoriteDTO {
  userName: string
  profileAvatarId: string | null;
}

export interface IFavoriteAdminDTO extends DomainEntityBaseMetadata {
  profileId: string;
  postId: string;
  postTitle: string | null;
  postImageId: string | null;
  postDescription: string | null;
}
