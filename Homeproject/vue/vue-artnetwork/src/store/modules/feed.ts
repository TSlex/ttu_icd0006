import { IPostDTO } from '@/types/IPostDTO';
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { FeedApi } from '@/services/FeedApi';

interface IState {
  feed: IPostDTO[];
  feedCount: number;
  feedLoadedCount: number;
}

export const FeedModule = {
  state: {
    feed: [] as IPostDTO[],
    feedCount: 0 as number,
    feedLoadedCount: -1,
  },
  getters: {},
  mutations: {
    setFeedCount(state: IState, feedCount: number) {
      state.feedCount = feedCount;
    },
    setFeed(state: IState, feed: IPostDTO[]) {
      state.feed = feed;
    },
    addFeed(state: IState, feed: IPostDTO[]) {
      // TODO: fix not unique
      feed.forEach(feed => state.feed.push(feed))
    },
  },
  actions: {
    async getFeedCount(context: any): Promise<CountResponseDTO> {
      const response = await FeedApi.getFeedCount(context.state.jwt);
      context.commit('setFeedCount', response.count)
      return response;
    },

    async getFeed(context: any, pageNumber: number): Promise<IPostDTO[]> {
      const response = await FeedApi.getFeed(pageNumber, context.state.jwt);
      context.state.feedLoadedCount = response.length;
      context.commit('addFeed', response)
      return response;
    },

    async setFeed(context: any, pageNUmber: number): Promise<IPostDTO[]> {
      const response = await FeedApi.getFeed(pageNUmber, context.state.jwt);
      context.state.feedLoadedCount = response.length;
      context.commit('setFeed', response);
      return response;
    },
  }
}
