import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { AppState } from 'state/state';
import { BaseApi } from './BaseApi';

@autoinject
export class PostsApi extends BaseApi {
  
  constructor(protected appState: AppState, protected httpClient: HttpClient) {
    super(appState, "posts", httpClient);
  }

  // private readonly _baseUrl = 'posts';

  // getPosts(): Promise<IPost[]> {
  //   return this.httpClient
  //     .fetch(this._baseUrl, { cache: "no-store", headers: {authorization: "bearer " + this.appState.jwt}})
  //     .then(response => response.json())
  //     .then((data: IPost[]) => data)
  //     .catch(reason => {
  //       console.error(reason);
  //       return [];
  //     });

  // }

  // getPost(id: string): Promise<IPost | null> {
  //   return this.httpClient
  //     .fetch(this._baseUrl + '/' + id, { cache: "no-store" })
  //     .then(response => response.json())
  //     .then((data: IPost) => data)
  //     .catch(reason => {
  //       console.error(reason);
  //       return null;
  //     });
  // }

  // createPost(post: IPost): Promise<string> {
  //   return this.httpClient.post(this._baseUrl, JSON.stringify(post), {
  //     cache: 'no-store'
  //   }).then(
  //     response => {
  //       console.log('createPost response', response);
  //       return response.statusText;
  //     }
  //   ).catch(reason => {
  //     console.error(reason);
  //     return JSON.stringify(reason);
  //   });
  // }

  // updatePost(post: IPost): Promise<string> {
  //   return this.httpClient.put(this._baseUrl + '/' + post.id, JSON.stringify(post), {
  //     cache: 'no-store'
  //   }).then(
  //     response => {
  //       console.log('updatePost response', response);
  //       return response.statusText;
  //     }
  //   ).catch(reason => {
  //     console.error(reason);
  //     return JSON.stringify(reason);
  //   });
  // }

  // deletePost(post: IPost): Promise<string> {
  //   return this.httpClient.delete(this._baseUrl + '/' + post.id, JSON.stringify(post), {
  //     cache: 'no-store'
  //   }).then(
  //     response => {
  //       console.log('deletePost response', response);
  //       return response.statusText;
  //     }
  //   ).catch(reason => {
  //     console.error(reason);
  //     return JSON.stringify(reason);
  //   });
  // }

}
