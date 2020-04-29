import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IPost } from 'domain/ipost';
import { AppState } from 'state/app-state';

@autoinject
export class PostService {
  constructor(private appState: AppState, private httpClient: HttpClient) {
    this.httpClient.baseUrl = this.appState.baseUrl;
  }

  private readonly _baseUrl = 'posts';

  getPosts(): Promise<IPost[]> {
    return this.httpClient
      .fetch(this._baseUrl, { cache: "no-store", headers: {authorization: "bearer " + this.appState.jwt}})
      .then(response => response.json())
      .then((data: IPost[]) => data)
      .catch(reason => {
        console.error(reason);
        return [];
      });

  }

  getPost(id: string): Promise<IPost | null> {
    return this.httpClient
      .fetch(this._baseUrl + '/' + id, { cache: "no-store" })
      .then(response => response.json())
      .then((data: IPost) => data)
      .catch(reason => {
        console.error(reason);
        return null;
      });
  }

  createPost(post: IPost): Promise<string> {
    return this.httpClient.post(this._baseUrl, JSON.stringify(post), {
      cache: 'no-store'
    }).then(
      response => {
        console.log('createPost response', response);
        return response.statusText;
      }
    ).catch(reason => {
      console.error(reason);
      return JSON.stringify(reason);
    });
  }

  updatePost(post: IPost): Promise<string> {
    return this.httpClient.put(this._baseUrl + '/' + post.id, JSON.stringify(post), {
      cache: 'no-store'
    }).then(
      response => {
        console.log('updatePost response', response);
        return response.statusText;
      }
    ).catch(reason => {
      console.error(reason);
      return JSON.stringify(reason);
    });
  }

  deletePost(post: IPost): Promise<string> {
    return this.httpClient.delete(this._baseUrl + '/' + post.id, JSON.stringify(post), {
      cache: 'no-store'
    }).then(
      response => {
        console.log('deletePost response', response);
        return response.statusText;
      }
    ).catch(reason => {
      console.error(reason);
      return JSON.stringify(reason);
    });
  }

}