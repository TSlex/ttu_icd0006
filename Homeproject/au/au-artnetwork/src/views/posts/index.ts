import { IPostGetDTO } from './../../types/IPostDTO';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PostsApi } from 'servises/PostsApi';
import { ViewBase } from 'components/ViewBase';
import { AppState } from 'state/state';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { IResponseDTO } from 'types/Response/IResponseDTO';

@autoinject
export class PostsIndex extends ViewBase {
    constructor(
        appState: AppState,
        private postsApi: PostsApi,
        private router: Router) {
        super(appState);
    }

    get posts() {
        return this.appState.posts.sort(
            (one, two) => {
                return new Date(one.postPublicationDateTime).getTime() < new Date(two.postPublicationDateTime).getTime() ? 1 : -1
            });
    }

    canEditThis(post: IPostGetDTO) {
        return post.profileUsername === this.appState.userName;
    }

    activated() {
        this.checkLoaded(this.posts.length > 0)
    }

    created() {
        this.checkLoaded(this.posts.length > 0)

        this.postsApi.Index()
            .then((response: IFetchResponse<IPostGetDTO[]>) => {
                if (response?.errors.length === 0) {
                    this.appState.posts = response.data;

                    this.setLoaded(true)
                }
            })
    }

    onEdit(post: IPostGetDTO) {
        if (this.canEditThis(post)) {

            this.appState.selectedPost = post;
            this.isLoading = true;
            this.router.navigateToRoute("posts-edit", { id: post.id });
        }
    }

    onDelete(post: IPostGetDTO) {
        if ((event.target as HTMLElement).tagName.toLowerCase() !== 'button') return;

        if (this.canEditThis(post)) {

            let element: HTMLButtonElement = (event.target as HTMLButtonElement);

            element.disabled = true;
            element.innerHTML = "";
            element.innerHTML = `<span disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span></span>`

            this.postsApi.Delete(post.id).then((response: IResponseDTO) => {
                if (!response?.errors) {

                    this.appState.posts.forEach((item: IPostGetDTO, index) => {
                        if (item.id === post.id) {
                            this.appState.posts.splice(index, 1);
                        }
                    })
                }
            })
        }
    }
}
