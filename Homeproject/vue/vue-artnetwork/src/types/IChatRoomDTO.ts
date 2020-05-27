export interface IChatRoomDTO {
  id: string
  chatRoomTitle: string;
  chatRoomImageUrl: string;
  chatRoomImageId: string;
  lastMessageValue: string;
  lastMessageDateTime: Date;
  lastMessageProfileAvatarId: string;
}

export interface IChatRoomPutDTO {
  id: string
  chatRoomTitle: string;
}
