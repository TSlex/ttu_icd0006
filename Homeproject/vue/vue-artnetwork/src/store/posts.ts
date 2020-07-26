import { IPostDTO, IPostPostDTO } from '@/types/IPostDTO';
import { PostsApi } from '@/services/PostsApi';
import { ResponseDTO } from '@/types/Response/ResponseDTO';

interface IState {
  selectedPost: IPostDTO | null;
  posts: IPostDTO[];
  postsLoadedCount: number;
}

export const PostsModule = {
  state: {
    selectedPost: null as IPostDTO | null,
    posts: [] as IPostDTO[],
    postsLoadedCount: -1,
  },
  getters: {},
  mutations: {
    setPost(state: IState, post: IPostDTO | null) {
      state.selectedPost = post
    },
    getPosts(state: IState, posts: IPostDTO[]) {
      posts.forEach(post => state.posts.push(post))
    },
    setPosts(state: IState, posts: IPostDTO[]) {
      state.posts = posts;
    },
  },
  actions: {
    async getPosts(context: any, params: { userName: string; pageNumber: number }): Promise<IPostDTO[]> {
      const response = await PostsApi.getProfilePosts(params.userName, params.pageNumber, context.state.jwt);
      context.commit('getPosts', response)
      return response;
    },
    async setPosts(context: any, params: { userName: string; pageNumber: number }): Promise<IPostDTO[]> {
      const response = await PostsApi.getProfilePosts(params.userName, params.pageNumber, context.state.jwt);
      context.commit('setPosts', response)
      return response;
    },
    async postPost(context: any, post: IPostPostDTO): Promise<ResponseDTO> {
      const response = await PostsApi.postPost(post, context.state.jwt);
      return response;
    },
  }
}
