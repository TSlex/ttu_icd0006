import { IPost } from 'domain/ipost';
import { autoinject } from 'aurelia-framework';
import { PostService } from 'servises/post-servise';

@autoinject
export class PostsIndex{
  private _posts: IPost[] = [];

    constructor(private postService: PostService) {

    }

    attached() {
        this.postService.getPosts().then(
            data => this._posts = data
        );
    }
}
