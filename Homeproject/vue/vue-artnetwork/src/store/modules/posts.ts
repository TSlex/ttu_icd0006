import { IPostDTO, IPostPostDTO, IPostPutDTO } from '@/types/IPostDTO';
import { PostsApi } from '@/services/PostsApi';
import { ResponseDTO } from '@/types/Response/ResponseDTO';
import { deleteFromArrayById } from '@/helpers/deleteArray';
import { distinctIdArray } from '@/helpers/distinctArray';

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
      state.posts = distinctIdArray([...posts, state.posts])
    },
    setPosts(state: IState, posts: IPostDTO[]) {
      state.posts = posts;
    },
    updatePost(state: IState, post: IPostDTO) {
      if (!state.selectedPost) return;

      state.selectedPost!.postTitle = post.postTitle;
      state.selectedPost!.postDescription = post.postDescription;
    },
    deletePost(state: IState, post: IPostDTO) {
      state.posts = deleteFromArrayById(state.posts, post.id)
    }
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
    async putPost(context: any, post: IPostPutDTO): Promise<ResponseDTO> {
      context.commit('updatePost', post)

      const response = await PostsApi.putPost(post.id, post, context.state.jwt);
      return response;
    },
    async deletePost(context: any, post: IPostPutDTO): Promise<ResponseDTO> {
      context.commit('deletePost', post)
      context.commit('deleteFeed', post)

      const response = await PostsApi.deletePost(post.id, context.state.jwt);
      return response;
    },
  }
}
