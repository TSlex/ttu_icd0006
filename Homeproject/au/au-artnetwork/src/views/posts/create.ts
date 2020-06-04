import { PostsApi } from './../../servises/PostsApi';
import { autoinject } from 'aurelia-framework';
import { RouteConfig, NavigationInstruction, Router } from 'aurelia-router';

@autoinject
export class PostsCreate {
  _title = "";
  _description = "";
  _imageUrl = "";

  constructor(private postApi: PostsApi, private router: Router) {

  }

  attached() {

  }

  activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {

  }

  onSubmit(event: Event) {
  }
}
