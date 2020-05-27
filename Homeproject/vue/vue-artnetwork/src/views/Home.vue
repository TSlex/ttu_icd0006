<template>
  <div class="home">
    <PostDetails v-if="post" :post="post" v-on:closePost="closePost" />
    <h3 class="text-center">Last posts</h3>
    <hr />
    <a class="float_control feed_controls far fa-caret-square-up" id="toUpButton" v-on:click="scrollTop"></a>
    <div class="feed text-center">
      <a v-for="post in feed" :key="post.id" @click="selectPost(post)">
        <div class="feed_post">
          <div class="post_image">
            <ImageComponent :id="post.postImageId" :key="post.postImageId" height="unset" width="unset" />
          </div>

          <div class="post_details_meta_section">
            <p>{{post.postTitle}} by {{post.profileUsername}}</p>
            <span>{{post.postDescription}}</span>
            <ul class="post_meta_section">
              <li class="post_meta">
                <span class="meta_title">{{post.postPublicationDateTime | formatDate}}</span>
              </li>
              <li class="post_meta">
                <span class="meta_counter">{{post.postFavoritesCount}}</span>
                &nbsp;
                <span class="meta_title">favorites</span>
              </li>
              <li class="post_meta">
                <span class="meta_counter">{{post.postCommentsCount}}</span>
                &nbsp;
                <span class="meta_title">comments</span>
              </li>
            </ul>
          </div>
        </div>
      </a>
      <span v-if="feed.length <= 0" style="margin-top: 100px">Nothing here yet...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../components/Image.vue";
import PostDetails from "../components/PostDetails.vue";
import store from "../store";
import router from "../router";
import { IPostDTO } from "../types/IPostDTO";

@Component({
  components: {
    ImageComponent,
    PostDetails
  }
})
export default class Home extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  private post: IPostDTO | null = null;

  selectPost(post: IPostDTO) {
    this.post = post;
  }

  closePost() {
    this.post = null;
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

  get canLoadMore(): boolean {
    return store.state.feedLoadedCount === 10;
  }

  get feed(): IPostDTO[] {
    return store.state.feed;
  }

  beforeCreate(): void {
    console.log("beforeCreate");

    store.dispatch("setFeed", 1);
  }

  created(): void {
    console.log("created");
  }

  beforeMount(): void {
    console.log("beforeMount");
  }

  mounted(): void {
    console.log("mounted");
    this.scroll();
  }

  beforeUpdate(): void {
    console.log("beforeUpdate");
  }

  updated(): void {
    console.log("updated");
    this.isFetching = false;
  }

  beforeDestroy(): void {
    console.log("beforeDestroy");
    window.onscroll = null;
  }

  destroyed(): void {
    console.log("destroyed");
  }
}
</script>
