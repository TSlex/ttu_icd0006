<template>
  <div class="home">
    <div class="feed text-center">
      <a v-for="post in feed" :key="post.id" href="#">
        <div class="feed_post">
          <div class="post_image">
            <img v-bind:src="post.postImageUrl" alt />
          </div>

          <div class="post_details_meta_section">
            <p>{{post.postTitle}} by NOUSERNAME</p>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";
import { IPostDTO } from "../types/IPostDTO";

@Component
export default class Home extends Vue {
  get feed(): IPostDTO[] {
    return store.state.feed;
  }

  beforeCreate(): void {
    console.log("beforeCreate");
    store.dispatch("getFeedCount");
    store.dispatch("getFeed", 3);
  }

  created(): void {
    console.log("created");
  }

  beforeMount(): void {
    console.log("beforeMount");
  }

  mounted(): void {
    console.log("mounted");
  }

  beforeUpdate(): void {
    console.log("beforeUpdate");
  }

  updated(): void {
    console.log("updated");
  }

  beforeDestroy(): void {
    console.log("beforeDestroy");
  }

  destroyed(): void {
    console.log("destroyed");
  }
}
</script>
