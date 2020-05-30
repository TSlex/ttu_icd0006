import { DomainEntityBaseMetadata } from '@/types/Domain/DomainEntityBaseMetadata'

export interface IFollowerDTO {
  userName: string
  profileAvatarId: string | null;
}

export interface IFollowerAdminDTO extends DomainEntityBaseMetadata {
  followerProfileId: string;
  profileId: string;
}
