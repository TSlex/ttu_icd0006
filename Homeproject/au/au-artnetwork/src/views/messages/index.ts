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
import { ViewBase } from 'components/ViewBase';

@autoinject
export class MessagesIndex extends ViewBase {

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

    constructor(
        appState: AppState,
        private messagesApi: MessagesApi,
        private chatMembersApi: ChatMembersApi,
        private chatRoomsApi: ChatRoomsApi,
        private router: Router) {
        super(appState);
    }

    created() {
        if (!(this.rooms.length > 0)) {
            this.isLoading = true;
            this.isLoaded = false;
        }

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

                                        this.isLoading = false;
                                        this.isLoaded = true;
                                    })
                            })
                    })
                }
            })
    }

    onEdit(member: IChatMemberDTO, message: IMessageGetDTO) {
        if (this.canEditThis(member, message)) {
            this.appState.selectedMessage = message;
            this.isLoading = true;
            this.router.navigateToRoute("messages-edit", { id: message.id });
        }
    }

    onDelete(member: IChatMemberDTO, message: IMessageGetDTO) {
        if ((event.target as HTMLElement).tagName.toLowerCase() !== 'button') return;

        if (this.canEditThis(member, message)) {
            let element: HTMLButtonElement = (event.target as HTMLButtonElement);

            element.disabled = true;
            element.innerHTML = "";
            element.innerHTML = `<span disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span></span>`

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
