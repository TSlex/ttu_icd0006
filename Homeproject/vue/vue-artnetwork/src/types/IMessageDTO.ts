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
  chatRoomId: string
  messageValue: string;
}
