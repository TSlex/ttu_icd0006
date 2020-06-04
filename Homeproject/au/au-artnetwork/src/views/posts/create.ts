import { autoinject } from 'aurelia-framework';
import { RouteConfig, NavigationInstruction, Router } from 'aurelia-router';
import { PostService } from '../../servises/PostsApi';

@autoinject
export class PostsCreate {
  _title = "";
  _description = "";
  _imageUrl = "";

  constructor(private postService: PostService, private router: Router) {

  }

  attached() {

  }

  activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {

  }

  onSubmit(event: Event) {
    console.log(event);
    this.postService
      .createPost({
        id: "",
        createdAt: Date.now(),
        changedAt: Date.now(),
        postPublicationDateTime: Date.now(),
        postTitle: this._title,
        postImageUrl: this._imageUrl,
        postDescription: this._description,
        postFavoritesCount: 0,
        postCommentsCount: 0,
        profileId: "d9127758-6027-4ebf-bab6-2034c86fe076",
        changedBy: null,
        createdBy: null,
        deletedAt: null,
        deletedBy: null
      })

      .then((resp) => {
        console.log('redirect?', resp);
        this.router.navigateToRoute('posts', {});
      });

    event.preventDefault();
  }
}
