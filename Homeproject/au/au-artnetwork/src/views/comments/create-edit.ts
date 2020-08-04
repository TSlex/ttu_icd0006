import { IResponseDTO } from '../../types/Response/IResponseDTO';
import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { FormComponentBase } from 'components/FormComponentBase';
import { CommentsApi } from 'servises/CommentsApi';
import { ICommentGetDTO } from 'types/ICommentDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { AppState } from 'state/state';
import { PostsApi } from 'servises/PostsApi';


@autoinject
export class CommentsCreateEdit extends FormComponentBase {

    constructor(appState: AppState, eventAggregator: EventAggregator, router: Router,
        private commentsApi: CommentsApi, private postsApi: PostsApi) {
        super(eventAggregator, router, appState)
    }

    private id: string;
    private postId: string;

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
        else if (params.postId && typeof (params.postId) == 'string') {
            this.postId = params.postId;

            let exist = await this.postsApi.Exists(this.postId)
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
            else if (this.postId) {
                this.commentsApi.Create(
                    {
                        postId: this.postId,
                        commentValue: this.commentValue
                    })
                    .then((response: IFetchResponse<ICommentGetDTO>) => {
                        if (!(response?.errors?.length > 0)) {

                            let newRecord = response.data

                            newRecord.userName = this.appState.userName;

                            let postComment = this.appState.postComments[this.postId]

                            if (postComment.comments) {
                                postComment.comments.reverse()
                                postComment.comments.push(newRecord)
                                postComment.comments.reverse()
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
