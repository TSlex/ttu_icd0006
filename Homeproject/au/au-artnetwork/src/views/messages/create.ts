import { ChatRoomsApi } from 'servises/ChatRoomsApi';
import { IResponseDTO } from './../../types/Response/IResponseDTO';
import { IImagePostDTO } from './../../types/IImageDTO';
import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { FormComponentBase } from 'components/FormComponentBase';
import { MessagesApi } from 'servises/MessagesApi';
import { IMessageGetDTO } from 'types/IMessageDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { AppState } from 'state/state';


@autoinject
export class MessagesCreate extends FormComponentBase {

    constructor(appState: AppState, eventAggregator: EventAggregator, router: Router,
        private messagesApi: MessagesApi, private chatRoomsApi: ChatRoomsApi) {
        super(eventAggregator, router, appState)
    }

    private id: string;
    private chatRoomId: string;

    private messageValue: string;

    // bind properties
    activate(params: any) {
        if (params.id && typeof (params.id) == 'string') {
            this.id = params.id;
        }
        if (params.chatRoomId && typeof (params.chatRoomId) == 'string') {
            this.chatRoomId = params.chatRoomId;
        }
    }

    async created() {

        console.log(this.id)
        console.log(this.chatRoomId)


        if (this.id) {

            let response = await this.messagesApi.Details(this.id)

            if (!response?.errors) {
                this.messageValue = response.data.messageValue;
            }
            else {
                this.onCancel();
            }

        } else if (this.chatRoomId) {
            let exist = await this.chatRoomsApi.Exist(this.chatRoomId)

            if (!exist) {
                this.onCancel();
            }
        }
    }

    onSubmit() {
        if (this.messageValue?.length > 0) {
            this.errors = []

            if (this.id) {
                this.messagesApi.Edit(this.id,
                    {
                        id: this.id,
                        messageValue: this.messageValue
                    }).then((response: IResponseDTO) => {
                        if (!response?.errors) {

                            this.appState.selectedMessage!.messageValue = this.messageValue;
                            this.onCancel();
                        } else {
                            this.errors = response.errors
                        }
                    })
            }
            else if (this.chatRoomId) {
                this.messagesApi.Create(
                    {
                        chatRoomId: this.chatRoomId,
                        messageValue: this.messageValue
                    })
                    .then((response: IResponseDTO) => {
                        if (!response?.errors) {
                            this.onCancel();
                        } else {
                            this.errors = response.errors
                        }
                    })
            } else {
                this.onCancel();
            }
        }
    }

    onCancel() {
        this.router.navigateToRoute('messages')
    }
}
