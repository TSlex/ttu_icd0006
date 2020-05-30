import { DomainEntityBaseMetaSoftUpdateDelete} from '@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete'

export interface IChatMemberDTO {
  id: string
  userName: string;
  profileAvatarId: string;
  chatRole: string;
  chatRoleValue: string;
  canRenameRoom: boolean;
  canEditMembers: boolean;
  canWriteMessages: boolean;
  canEditAllMessages: boolean;
  canEditMessages: boolean;
}

export interface IChatMemberAdminDTO extends DomainEntityBaseMetaSoftUpdateDelete {
  chatRoomTitle: string | null;
  chatRoomId: string;
  chatRoleId: string;
  profileId: string;
}
