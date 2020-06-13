import { ChatRoomsApi } from 'servises/ChatRoomsApi';
import { IResponseDTO } from '../../types/Response/IResponseDTO';
import { IImagePostDTO } from '../../types/IImageDTO';
import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { FormComponentBase } from 'components/FormComponentBase';
import { CommentsApi } from 'servises/CommentsApi';
import { ICommentGetDTO } from 'types/ICommentDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { AppState } from 'state/state';


@autoinject
export class CommentsCreateEdit extends FormComponentBase {

    constructor(appState: AppState, eventAggregator: EventAggregator, router: Router,
        private commentsApi: CommentsApi, private chatRoomsApi: ChatRoomsApi) {
        super(eventAggregator, router, appState)
    }

    private id: string;
    private chatRoomId: string;

    private commentValue: string;

    async activate(params: any) {
        // bind properties
        if (params.id && typeof (params.id) == 'string') {
            this.id = params.id;

            let response = await this.commentsApi.Details(this.id)

            if (!(response?.errors.length > 0)) {
                this.commentValue = response.data.commentValue;
            }
            else {
                this.onCancel();
            }
        }
        else if (params.chatRoomId && typeof (params.chatRoomId) == 'string') {
            this.chatRoomId = params.chatRoomId;

            let exist = await this.chatRoomsApi.Exists(this.chatRoomId)
            if (!exist) {
                this.onCancel();
            }
        }

        this.isLoading = false;
    }

    onSubmit() {
        if (this.commentValue?.length > 0) {
            this.errors = []
            this.lockBottons()

            if (this.id) {
                this.commentsApi.Edit(this.id,
                    {
                        id: this.id,
                        commentValue: this.commentValue
                    }).then((response: IResponseDTO) => {

                        if (!response?.errors) {

                            if (this.appState.selectedComment) {
                                this.appState.selectedComment!.commentValue = this.commentValue;
                            }
                            this.onCancel();
                        } else {
                            this.errors = response.errors
                            this.unlockBottons()
                        }
                    })
            }
            else if (this.chatRoomId) {
                this.commentsApi.Create(
                    {
                        chatRoomId: this.chatRoomId,
                        commentValue: this.commentValue
                    })
                    .then((response: IFetchResponse<ICommentGetDTO>) => {
                        if (!(response?.errors?.length > 0)) {
                            let newRecord = response.data
                            let roomComment = this.appState.roomComments[newRecord.chatRoomId]

                            if (roomComment.comments) {
                                roomComment.comments.reverse()
                                roomComment.comments.push(newRecord)
                                roomComment.comments.reverse()

                                roomComment.chatRoom.lastCommentDateTime = newRecord.commentDateTime
                            }

                            this.onCancel();
                        } else {
                            this.errors = response.errors;
                            this.unlockBottons();
                        }
                    })
            } else {
                this.onCancel();
            }
        }
    }

    onCancel() {
        this.router.navigateToRoute('comments')
    }
}
