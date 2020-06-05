export interface IChatMemberDTO {
  id: string;
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
