import { autoinject } from 'aurelia-framework';
import { PostsApi } from 'servises/PostsApi';

@autoinject
export class PostsIndex{
    constructor(private postApi: PostsApi) {

    }

    attached() {
    }
}
