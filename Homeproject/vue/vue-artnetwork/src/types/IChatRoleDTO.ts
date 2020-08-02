import { DomainEntityBaseMetaSoftUpdateDelete } from '@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete'

export interface IChatRoleDTO {
  roleTitle: string;
  roleTitleValue: string;
  canRenameRoom: boolean;
  canEditMembers: boolean;
  canWriteMessages: boolean;
  canEditAllMessages: boolean;
  canEditMessages: boolean;
}

export interface IChatRoleAdminDTO extends DomainEntityBaseMetaSoftUpdateDelete {
  roleTitle: string;
  roleTitleValue: string;
  roleTitleValueId: string;
  canRenameRoom: boolean;
  canEditMembers: boolean;
  canWriteMessages: boolean;
  canEditAllMessages: boolean;
  canEditMessages: boolean;
}
