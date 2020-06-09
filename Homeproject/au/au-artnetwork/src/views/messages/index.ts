import { IResponseDTO } from 'types/Response/IResponseDTO';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { Router } from 'aurelia-router';

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
        return Object.values(this.appState.roomMessages).sort(
            (one, two) => {
                return new Date(one.chatRoom.lastMessageDateTime).getTime() < new Date(two.chatRoom.lastMessageDateTime).getTime() ? 1 : -1
            });
    }

    canEditThis(member: IChatMemberDTO, message: IMessageGetDTO) {
        return message.userName === member.userName && member.canEditMessages ||
            member.canEditAllMessages
    }

    constructor(private appState: AppState, private messagesApi: MessagesApi,
        private chatMembersApi: ChatMembersApi, private chatRoomsApi: ChatRoomsApi,
        private router: Router) { }

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

    onEdit(member: IChatMemberDTO, message: IMessageGetDTO) {
        if (this.canEditThis(member, message)) {
            console.log(message)
            this.appState.selectedMessage = message;
            this.router.navigateToRoute("messages-edit", {id: message.id});
        }
    }

    onDelete(member: IChatMemberDTO, message: IMessageGetDTO) {
        if (this.canEditThis(member, message)) {
            this.messagesApi.Delete(message.id).then((response: IResponseDTO) => {
                if (!response?.errors) {
                    let messages = this.appState.roomMessages[message.chatRoomId].messages;

                    messages.forEach((item: IMessageGetDTO, index) => {
                        if (item.id === message.id) {
                            messages.splice(index, 1);
                        }
                    })
                }
            })
        }
    }
}
