import { autoinject, PLATFORM } from 'aurelia-framework';

import { ChatMembersApi } from 'servises/ChatMembersApi';
import { MessagesApi } from 'servises/MessagesApi';
import { ChatRoomsApi } from 'servises/ChatRoomsApi';

import { IMessageGetDTO } from 'types/IMessageDTO';
import { IChatRoomDTO } from 'types/IChatRoomDTO';
import { IChatMemberDTO } from 'types/IChatMemberDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { AppState } from 'state/state';

@autoinject
export class MessagesIndex {

    get rooms() {
        return Object.values(this.appState.roomMessages);
    }

    constructor(private appState: AppState, private messagesApi: MessagesApi, private chatMembersApi: ChatMembersApi, private chatRoomsApi: ChatRoomsApi) { }

    created() {
        this.chatRoomsApi.Index()
            .then((response: IFetchResponse<IChatRoomDTO[]>) => {
                if (response?.errors.length === 0) {
                    let chatRooms = response.data!;

                    chatRooms.forEach((room: IChatRoomDTO) => {
                        let chatMember: IChatMemberDTO | null = null;

                        this.chatMembersApi.Index(room.id)
                            .then((response: IFetchResponse<IChatMemberDTO[]>) => {
                                response.data.forEach((member: IChatMemberDTO) => {
                                    if (member.userName === this.appState.userName) {
                                        chatMember = member;
                                    }
                                })

                                this.messagesApi.Index(room.id)
                                    .then((response: IFetchResponse<IMessageGetDTO[]>) => {
                                        this.appState.roomMessages[room.id] = {
                                            chatRoom: room,
                                            chatMember: chatMember,
                                            messages: response.data
                                        }
                                    })
                            })
                    })
                }
            })
    }

    onEdit(message: IMessageGetDTO){
        console.log(message)
    }

    onDelete(message: IMessageGetDTO){
        console.log(message)
    }
}
