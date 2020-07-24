<template>
  <div class="home">
    <PostDetails v-if="post" v-on:closePost="closePost" />
    <h3 class="text-center">{{$t('views.home.FeedHeader')}}</h3>
    <hr />
    <a class="float_control feed_controls far fa-caret-square-up" id="toUpButton" v-on:click="scrollTop"></a>
    <div class="feed text-center">
      <a v-for="post in feed" :key="post.id" @click="onSelectPost(post)">
        <div class="feed_post">
          <div class="post_image">
            <ImageComponent :id="post.postImageId" :key="post.postImageId" height="unset" width="unset" />
          </div>

          <div class="post_details_meta_section">
            <p>{{post.postTitle}} {{$t('views.posts.ByUsername')}} {{post.profileUsername}}</p>
            <span>{{post.postDescription}}</span>
            <ul class="post_meta_section">
              <li class="post_meta">
                <span class="meta_title">{{post.postPublicationDateTime | formatDate}}</span>
              </li>
              <li class="post_meta">
                <span class="meta_counter">{{post.postFavoritesCount}}</span>
                &nbsp;
                <span class="meta_title">{{$t('views.posts.OfFavorites')}}</span>
              </li>
              <li class="post_meta">
                <span class="meta_counter">{{post.postCommentsCount}}</span>
                &nbsp;
                <span class="meta_title">{{$t('views.posts.OfComments')}}</span>
              </li>
            </ul>
          </div>
        </div>
      </a>
      <span v-if="feed.length <= 0" style="margin-top: 100px">{{$t('views.profiles.NoPosts')}}...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../components/Image.vue";
import PostDetails from "../views/posts/PostDetails.vue";
import store from "../store";
import router from "../router";
import { IPostDTO } from "../types/IPostDTO";

@Component({
  components: {
    ImageComponent,
    PostDetails,
  },
})
export default class Home extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  get post(): IPostDTO | null {
    return store.state.selectedPost;
  }

  get canLoadMore(): boolean {
    return store.state.feedLoadedCount === 10;
  }

  get feed(): IPostDTO[] {
    return store.state.feed;
  }

  onSelectPost(post: IPostDTO) {
    store.commit("setPost", post);
  }

  closePost() {
    store.commit("setPost", null);
  }

  scrollTop() {
    document.documentElement.scrollTop = 0;
  }

  scroll() {
    window.onscroll = (e: Event) => {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight >
        document.documentElement.offsetHeight - 1400;

      let toUpButton = document.getElementById("toUpButton")!;

      if (document.documentElement.scrollTop > 100) {
        toUpButton.style.display = "initial";
      } else {
        toUpButton.style.display = "none";
      }

      if (bottomOfWindow && this.canLoadMore && !this.isFetching) {
        this.isFetching = true;
        store.dispatch("getFeed", this.pageToLoad);
        this.pageToLoad += 1;
        // console.log(this.pageToLoad);
      }
    };
  }

  beforeCreate(): void {
    store.dispatch("setFeed", 1);
  }

  mounted(): void {
    this.scroll();
  }

  updated(): void {
    this.isFetching = false;
  }

  beforeDestroy(): void {
    window.onscroll = null;
  }
}
</script>
