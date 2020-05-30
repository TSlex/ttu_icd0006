import { DomainEntityBaseMetadata} from '@/types/Domain/DomainEntityBaseMetadata'

export interface IBlockedProfileDTO {
  userName: string
  profileAvatarId: string;
}

export interface IBlockedProfileAdminDTO extends DomainEntityBaseMetadata{
  profileId: string;
  bProfileId: string;
}
