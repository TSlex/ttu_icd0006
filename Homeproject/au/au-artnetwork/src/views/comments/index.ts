import { PostsApi } from 'servises/PostsApi';
import { IResponseDTO } from 'types/Response/IResponseDTO';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { CommentsApi } from 'servises/CommentsApi';

import { ICommentGetDTO } from 'types/ICommentDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { AppState } from 'state/state';
import { ViewBase } from 'components/ViewBase';
import { IPostGetDTO } from 'types/IPostDTO';

@autoinject
export class CommentsIndex extends ViewBase {

    get posts() {
        return Object.values(this.appState.postComments).sort(
            (one, two) => {
                return new Date(one.post.postPublicationDateTime).getTime() < new Date(two.post.postPublicationDateTime).getTime() ? 1 : -1
            });
    }

    canEditThis(comment: ICommentGetDTO) {
        return comment.userName === this.appState.userName;
    }

    canDeleteThis(post: IPostGetDTO, comment: ICommentGetDTO) {
        return comment.userName === this.appState.userName || post.profileUsername === this.appState.userName;
    }

    constructor(
        appState: AppState,
        private commentsApi: CommentsApi,
        private postsApi: PostsApi,
        private router: Router) {
        super(appState);
    }

    activated() {
        this.checkLoaded(this.posts.length > 0)
    }

    created() {
        this.checkLoaded(this.posts.length > 0)
        this.postsApi.Index()
            .then((response: IFetchResponse<IPostGetDTO[]>) => {
                if (response?.errors.length === 0) {
                    let posts = response.data!;

                    posts.forEach((post: IPostGetDTO) => {
                        this.commentsApi.Index(post.id)
                            .then((response: IFetchResponse<ICommentGetDTO[]>) => {
                                this.appState.postComments[post.id] = {
                                    post: post,
                                    comments: response.data
                                }

                                this.setLoaded(true)
                            })
                    })
                }
            })
    }

    onEdit(comment: ICommentGetDTO) {
        if (this.canEditThis(comment)) {
            this.appState.selectedComment = comment;
            this.isLoading = true;
            this.router.navigateToRoute("comments-edit", { id: comment.id });
        }
    }

    onDelete(post: IPostGetDTO, comment: ICommentGetDTO) {
        if ((event.target as HTMLElement).tagName.toLowerCase() !== 'button') return;

        if (this.canDeleteThis(post, comment)) {
            let element: HTMLButtonElement = (event.target as HTMLButtonElement);

            element.disabled = true;
            element.innerHTML = "";
            element.innerHTML = `<span disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span></span>`

            this.commentsApi.Delete(comment.id).then((response: IResponseDTO) => {
                if (!response?.errors) {
                    let comments = this.appState.postComments[post.id].comments;

                    comments.forEach((item: ICommentGetDTO, index) => {
                        if (item.id === comment.id) {
                            comments.splice(index, 1);
                        }
                    })
                }
            })
        }
    }
}
