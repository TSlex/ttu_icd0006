import { IChatRoomDTO } from "./IChatRoomDTO";
import { IChatMemberDTO } from "./IChatMemberDTO";

export interface IMessageGetDTO {
  id: string;
  chatRoomId: string;
  profileAvatarId: string | null;
  userName: string;
  messageValue: string;
  messageDateTime: Date;
}

export interface IMessagePostDTO {
  chatRoomId: string;
  messageValue: string;
}

export interface IMessagePutDTO {
  id: string;
  messageValue: string;
}
