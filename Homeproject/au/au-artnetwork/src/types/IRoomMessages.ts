import { IChatRoomDTO } from "./IChatRoomDTO";
import { IMessageGetDTO } from "./IMessageDTO";
import { IChatMemberDTO } from "./IChatMemberDTO";

export interface IRoomMessages {
    chatRoom: IChatRoomDTO,
    messages: IMessageGetDTO[],
    chatMember: IChatMemberDTO
  }
