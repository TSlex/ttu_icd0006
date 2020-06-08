import { ChatRoomsApi } from 'servises/ChatRoomsApi';
import { IResponseDTO } from '../../types/Response/IResponseDTO';
import { IImagePostDTO } from '../../types/IImageDTO';
import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { FormComponentBase } from 'components/FormComponentBase';
import { MessagesApi } from 'servises/MessagesApi';
import { IMessageGetDTO } from 'types/IMessageDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { AppState } from 'state/state';


@autoinject
export class MessagesCreateEdit extends FormComponentBase {

    constructor(appState: AppState, eventAggregator: EventAggregator, router: Router,
        private messagesApi: MessagesApi, private chatRoomsApi: ChatRoomsApi) {
        super(eventAggregator, router, appState)
    }

    private id: string;
    private chatRoomId: string;

    private messageValue: string;

    async activate(params: any) {

        console.log(this.id)
        console.log(this.chatRoomId)
        
        // bind properties
        if (params.id && typeof (params.id) == 'string') {
            this.id = params.id;

            let response = await this.messagesApi.Details(this.id)

            if (!response?.errors) {
                this.messageValue = response.data.messageValue;
            }
            else {
                this.onCancel();
            }
        }
        else if (params.chatRoomId && typeof (params.chatRoomId) == 'string') {
            this.chatRoomId = params.chatRoomId;

            let exist = await this.chatRoomsApi.Exists(this.chatRoomId)
            console.log(exist)
            if (!exist) {
                this.onCancel();
            }
        }
    }

    onSubmit() {
        if (this.messageValue?.length > 0) {
            this.errors = []
            this.lockBottons()

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
                            this.unlockBottons()
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
                            this.unlockBottons()
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
