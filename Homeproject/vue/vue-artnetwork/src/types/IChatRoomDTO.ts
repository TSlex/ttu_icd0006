import { DomainEntityBaseMetaSoftUpdateDelete } from '@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete'

export interface IChatRoomDTO {
  id: string
  chatRoomTitle: string;
  chatRoomImageUrl: string | null;
  chatRoomImageId: string | null;
  lastMessageValue: string | null;
  lastMessageDateTime: Date | null;
  lastMessageProfileAvatarId: string | null;
}

export interface IChatRoomPutDTO {
  id: string
  chatRoomTitle: string;
}

export interface IChatRoomAdminDTO extends DomainEntityBaseMetaSoftUpdateDelete {
  chatRoomTitle: string;
  chatRoomImageUrl: string | null;
  chatRoomImageId: string | null;
}
