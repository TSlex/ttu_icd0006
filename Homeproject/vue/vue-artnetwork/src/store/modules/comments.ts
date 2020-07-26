import { ICommentDTO, ICommentPostDTO } from '@/types/ICommentDTO';
import { distinctIdArray } from '@/helpers/distinctArray';
import { CommentsApi } from '@/services/CommentsApi';
import { ResponseDTO } from '@/types/Response/ResponseDTO';
import moment from 'moment';

interface IState {
  comments: ICommentDTO[];
  commentsLoadedCount: number;
}

export const CommentsModule = {
  state: {
    comments: [] as ICommentDTO[],
    commentsLoadedCount: -1,
  },
  getters: {
    getComments(state: IState) {
      return state.comments.sort((comment1, comment2) => {
        return comment1.commentDateTime < comment2.commentDateTime ? 1 : -1
      })
    }
  },
  mutations: {
    getComments(state: IState, comments: ICommentDTO[]) {
      state.comments = distinctIdArray([...comments, ...state.comments])
    },
    setComments(state: IState, comments: ICommentDTO[]) {
      state.comments = comments;
    },
    deleteComment(state: IState, comment: ICommentDTO) {
      state.comments.forEach((element: ICommentDTO, index: any) => {
        if (element.id === comment.id) {
          state.comments.splice(index, 1)
        }
      });
    },
  },
  actions: {
    async getComments(context: any, params: { postId: string; pageNumber: number }): Promise<ICommentDTO[]> {
      const response = await CommentsApi.getComments(params.postId, params.pageNumber, context.state.jwt);
      context.commit('getComments', response)
      return response;
    },
    async setComments(context: any, params: { postId: string; pageNumber: number }): Promise<ICommentDTO[]> {
      const response = await CommentsApi.getComments(params.postId, params.pageNumber, context.state.jwt);
      context.commit('setComments', response)
      return response;
    },
    async postComment(context: any, comment: ICommentPostDTO): Promise<ResponseDTO> {
      const response = await CommentsApi.postComment(comment, context.state.jwt);
      await context.dispatch('getComments', { postId: comment.postId, pageNumber: 1 });

      context.commit('deleteComment', comment)

      return response;
    },
    async deleteComment(context: any, comment: ICommentDTO): Promise<ResponseDTO> {
      const response = await CommentsApi.deleteComment(comment.id, context.state.jwt);
      context.commit('deleteComment', comment);
      return response;
    },
  }
}
