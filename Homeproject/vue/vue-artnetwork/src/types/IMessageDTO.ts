import { DomainEntityBaseMetaSoftUpdateDelete } from '@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete'

export interface IMessageDTO {
  id: string;
  chatRoomId: string;
  userName: string;
  profileAvatarId: string;
  messageValue: string;
  messageDateTime: Date;
}

export interface IMessagePostDTO {
  chatRoomId: string
  messageValue: string;
}

export interface IMessagePutDTO {
  id: string
  messageValue: string;
}

export interface IMessageAdminDTO extends DomainEntityBaseMetaSoftUpdateDelete {
  messageValue: string;
  messageDateTime: Date;
  profileId: string;
  chatRoomId: string;
}
