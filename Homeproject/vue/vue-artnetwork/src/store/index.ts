import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { AccountApi } from '@/services/AccountApi';
import { FeedApi } from '@/services/FeedApi';

import JwtDecode from "jwt-decode";

import { ILoginDTO } from '@/types/Identity/ILoginDTO';
import { IRegisterDTO } from '@/types/Identity/IRegisterDTO'
import { JwtResponseDTO } from '@/types/Response/JwtResponseDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { IPostDTO, IPostPostDTO } from '@/types/IPostDTO';
import { ProfileApi } from '@/services/ProfileApi';
import { ChatRoomsApi } from '@/services/ChatRoomsApi';
import { ChatMembersApi } from '@/services/ChatMembersApi';
import { MessagesApi } from '@/services/MessagesApi';
import { IRankDTO } from './../types/IRankDTO';
import { IGiftDTO } from './../types/IGiftDTO';
import { ICommentDTO, ICommentPostDTO } from './../types/ICommentDTO';
import { IChatMemberDTO } from './../types/IChatMemberDTO';
import { IMessageDTO, IMessagePostDTO } from './../types/IMessageDTO';
import { IChatRoomDTO } from './../types/IChatRoomDTO';
import { PostsApi } from '@/services/PostsApi';
import { CommentsApi } from '@/services/CommentsApi';
import { GiftsApi } from '@/services/GiftsApi';
import { RanksApi } from '@/services/RanksApi';

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    jwt: null as string | null,

    // Feed
    feed: [] as IPostDTO[],
    feedCount: 0 as number,
    feedLoadedCount: -1,

    // Profile
    profile: null as IProfileDTO | null,

    // Posts
    posts: [] as IPostDTO[],
    postsLoadedCount: -1,

    // Comments
    comments: [] as ICommentDTO[],
    commentsLoadedCount: -1,

    // Gifts
    profileGifts: [] as IGiftDTO[],
    giftsLoadedCount: -1,

    // Ranks
    profileRank: null as IRankDTO | null,

    //Messages
    chatRooms: [] as IChatRoomDTO[],
    messages: [] as IMessageDTO[],
    messagesLoadedCount: -1,
    members: [] as IChatMemberDTO[],
  },

  getters: {
    isAuthenticated(context, getters): boolean {
      return getters.getJwt !== null;
    },
    getUserName(context, getters): string {
      if (getters.isAuthenticated) {
        const decoded = JwtDecode(context.jwt!) as Record<string, string>;
        return decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      }
      return "null";
    },
    getUserId(context, getters): string {
      if (getters.isAuthenticated) {
        const decoded = JwtDecode(context.jwt!) as Record<string, string>;
        return decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      }
      return "null";
    },
    getUserRoles(context, getters): string[] {
      if (getters.isAuthenticated) {
        const decoded = JwtDecode(context.jwt!) as Record<string, string>;
        return decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ].split(",");
      }
      return [];
    },
    getJwt(context, actions): string | null {
      if (!context.jwt) {
        context.jwt = localStorage.getItem('jwt')
      }

      if (context.jwt) {
        const decode = JwtDecode(context.jwt!) as Record<string, string>;
        const jwtExpires = parseInt(decode.exp)

        if (Date.now() >= jwtExpires * 1000) {
          context.jwt = null
          localStorage.removeItem('jwt')
        }
      }

      return context.jwt;
    }
  },

  mutations: {
    setJwt(state, jwt: string | null) {
      if (jwt) {
        localStorage.setItem('jwt', jwt)
        state.jwt = jwt;
      } else {
        localStorage.removeItem('jwt')
      }
    },

    // Feed
    setFeedCount(state, feedCount: number) {
      state.feedCount = feedCount;
    },
    setFeed(state, feed: IPostDTO[]) {
      state.feed = feed;
    },
    addFeed(state, feed: IPostDTO[]) {
      // TODO: fix not unique
      feed.forEach(feed => state.feed.push(feed))
    },

    // Profile
    setProfile(state, profile: IProfileDTO | null) {
      state.profile = profile;
    },

    // Posts
    getPosts(state, posts: IPostDTO[]) {
      posts.forEach(post => state.posts.push(post))
    },
    setPosts(state, posts: IPostDTO[]) {
      state.posts = posts;
    },

    // Comments
    getComments(state, comments: ICommentDTO[]) {
      comments.forEach(comment => state.comments.push(comment))
    },
    setComments(state, comments: ICommentDTO[]) {
      state.comments = comments;
    },

    // ProfileGifts
    setProfileGifts(state, gifts: IGiftDTO[]) {
      state.profileGifts = gifts;
    },

    // Messages
    setChatRooms(state, chatRooms: IChatRoomDTO[]) {
      state.chatRooms = chatRooms;
    },
    setMessages(state, messages: IMessageDTO[]) {
      state.messages = messages;
    },
    setMembers(state, members: IChatMemberDTO[]) {
      state.members = members;
    },

    // Rank
    setProfileRank(state, rank: IRankDTO) {
      state.profileRank = rank;
    }
  },

  actions: {
    clearJwt(context): void {
      context.commit('setJwt', null);
    },

    // Account
    async loginUser(context, loginDTO: ILoginDTO): Promise<JwtResponseDTO> {
      const response = await AccountApi.userLogin(loginDTO);
      if (!(response.errors?.length > 0)) {
        context.commit('setJwt', response.token);
      }
      return response;
    },

    async registerUser(context, registerDTO: IRegisterDTO): Promise<ResponseDTO> {
      const response = await AccountApi.userRegister(registerDTO);
      return response;
    },

    // Feed
    async getFeedCount(context): Promise<CountResponseDTO> {
      const response = await FeedApi.getFeedCount(context.state.jwt);
      context.commit('setFeedCount', response.count)
      return response;
    },

    async getFeed(context, pageNumber: number): Promise<IPostDTO[]> {
      const response = await FeedApi.getFeed(pageNumber, context.state.jwt);
      context.state.feedLoadedCount = response.length;
      context.commit('addFeed', response)
      return response;
    },

    async setFeed(context, pageNUmber: number): Promise<IPostDTO[]> {
      const response = await FeedApi.getFeed(pageNUmber, context.state.jwt);
      context.state.feedLoadedCount = response.length;
      context.commit('setFeed', response);
      return response;
    },

    // Profile
    async getProfile(context, username: string): Promise<IProfileDTO> {
      const response = await ProfileApi.getProfile(username, context.state.jwt);
      context.commit('setProfile', response);
      return response;
    },

    async profileFollow(context, username: string): Promise<ResponseDTO> {
      const response = await ProfileApi.follow(username, context.state.jwt);
      return response;
    },

    async profileUnfollow(context, username: string): Promise<ResponseDTO> {
      const response = await ProfileApi.unfollow(username, context.state.jwt);
      return response;
    },

    async profileBlock(context, username: string): Promise<ResponseDTO> {
      const response = await ProfileApi.block(username, context.state.jwt);
      return response;
    },

    async profileUnblock(context, username: string): Promise<ResponseDTO> {
      const response = await ProfileApi.unblock(username, context.state.jwt);
      return response;
    },

    // Messages
    async getChatRooms(context): Promise<IChatRoomDTO[]> {
      const response = await ChatRoomsApi.getChatRooms(context.state.jwt);
      context.commit('setChatRooms', response)
      return response;
    },
    async getMessages(context, params: { chatRoomId: string; pageNumber: number }): Promise<IMessageDTO[]> {
      const response = await ChatRoomsApi.getMessages(params.chatRoomId, params.pageNumber, context.state.jwt);
      context.commit('setMessages', response)
      return response;
    },
    async getChatMembers(context, chatRoomId: string): Promise<IChatMemberDTO[]> {
      const response = await ChatMembersApi.getChatMembers(chatRoomId, context.state.jwt);
      context.commit('setMembers', response)
      return response;
    },
    async sendMessage(context, message: IMessagePostDTO): Promise<ResponseDTO> {
      const response = await MessagesApi.postMessage(message, context.state.jwt);
      context.dispatch('getMessages', { chatRoomId: message.chatRoomId, pageNumber: 1 });
      return response;
    },

    // Posts
    async getPosts(context, params: { userName: string; pageNumber: number }): Promise<IPostPostDTO[]> {
      const response = await PostsApi.getProfilePosts(params.userName, params.pageNumber, context.state.jwt);
      context.commit('getPosts', response)
      return response;
    },
    async setPosts(context, params: { userName: string; pageNumber: number }): Promise<IPostPostDTO[]> {
      const response = await PostsApi.getProfilePosts(params.userName, params.pageNumber, context.state.jwt);
      context.commit('setPosts', response)
      return response;
    },
    async postPost(context, post: IPostPostDTO): Promise<ResponseDTO> {
      const response = await PostsApi.postPost(post, context.state.jwt);
      return response;
    },

    // Comments
    async getComments(context, params: { postId: string; pageNumber: number }): Promise<ICommentDTO[]> {
      const response = await CommentsApi.getComments(params.postId, params.pageNumber, context.state.jwt);
      context.commit('getComments', response)
      return response;
    },
    async setComments(context, params: { postId: string; pageNumber: number }): Promise<ICommentDTO[]> {
      const response = await CommentsApi.getComments(params.postId, params.pageNumber, context.state.jwt);
      context.commit('setComments', response)
      return response;
    },
    async postComment(context, comment: ICommentPostDTO): Promise<ResponseDTO> {
      const response = await CommentsApi.postComment(comment, context.state.jwt);
      context.dispatch('setComments', { postId: comment.postId, pageNumber: 1 });
      return response;
    },

    // ProfileGifts
    async getProfileGifts(context, params: { userName: string; pageNumber: number }): Promise<IGiftDTO[]> {
      const response = await GiftsApi.getProfileGifts(params.userName, params.pageNumber, context.state.jwt);
      context.commit('setProfileGifts', response)
      return response;
    },

    // Rank
    async getProfileRank(context, userName: string): Promise<IRankDTO> {
      const response = await RanksApi.getProfileRank(userName, context.state.jwt);
      context.commit('setProfileRank', response)
      return response;
    }
  },

  modules: {
  }
})
