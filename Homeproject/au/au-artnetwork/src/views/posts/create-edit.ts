import { IPostPutDTO, IPostPostDTO } from './../../types/IPostDTO';
import { ImagesApi } from 'servises/ImagesApi';
import { IPostGetDTO } from 'types/IPostDTO';
import { PostsApi } from 'servises/PostsApi';
import { IResponseDTO } from 'types/Response/IResponseDTO';
import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { IMessageGetDTO } from 'types/IMessageDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { AppState } from 'state/state';
import { ImageFormComponent } from 'components/ImageFormComponent';
import { IImageDTO } from 'types/IImageDTO';
import { ImageType } from 'types/Enums/ImageType';


@autoinject
export class ChatRoomsCreateEdit extends ImageFormComponent {

    constructor(appState: AppState, eventAggregator: EventAggregator, router: Router,
        private postsApi: PostsApi, private imagesApi: ImagesApi) {
        super(eventAggregator, router, appState)
    }

    private id: string;

    private postModel: IPostGetDTO | null = null;

    async activate(params: any) {
        // bind properties
        if (params.id && typeof (params.id) == 'string') {
            this.id = params.id;

            let response: any = await this.postsApi.Details(this.id)

            if (!(response?.errors.length > 0)) {
                this.postModel = response.data;
            }
            else {
                this.onCancel();
            }

            response = await this.imagesApi.getImageModel(this.postModel.postImageId)

            if (!(response?.errors.length > 0)) {
                this.imageModel = response.data;
                this.isImageLoaded = true;
            }
            else {
                this.onCancel();
            }
        }
        else {
            this.postModel = {
                id: "",
                postTitle: "",
                postDescription: "",
                postImageId: "",
                isFavorite: false,
                postCommentsCount: 0,
                postFavoritesCount: 0,
                postPublicationDateTime: new Date(),
                profileUsername: ""
            }

            this.imageModel = this.getNewImageModel(ImageType.Post);
        }

        this.loadScript();

        // this.isLoading = false;
    }

    onSubmit() {
        this.clearNotifier()

        if ((this.imageModel.imageFile || this.id) &&
            this.postModel.postTitle.length > 0 &&
            this.postModel.postDescription.length > 0
        ) {
            if (this.id) {
                this.postsApi.Edit(this.postModel.id, this.postModel as IPostPutDTO).then(
                    (response: IResponseDTO) => {
                        if (!(response.errors?.length > 0)) {
                            this.onCancel();
                        } else {
                            response.errors.forEach((error: string) => { this.errors.push(error) })
                        }
                    }
                )

                this.imagesApi.putImageModel(this.imageModel.id, this.imageModel).then(
                    (response: IResponseDTO) => {
                        if (response.errors?.length > 0) {
                            response.errors.forEach((error: string) => { this.errors.push(error) })
                        }
                    }
                )

            } else {
                this.imagesApi.postImageModel(this.imageModel).then(
                    (response: IFetchResponse<IImageDTO>) => {
                        this.postModel.id = response.data.imageFor;
                        this.postModel.postImageId = response.data.id;

                        this.postsApi.Create(this.postModel as IPostPostDTO).then(
                            (response: IFetchResponse<IPostGetDTO>) => {
                                if (!(response.errors?.length > 0)) {
                                    this.appState.posts.push(response.data)
                                    this.onCancel();
                                } else {

                                }
                            }
                        )
                    }
                )
            }
        } else {
            this.errors.push("Ensure that all fields is filled!");
        }
    }

    onCancel() {
        this.router.navigateToRoute('posts')
    }
}
