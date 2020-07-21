<template>
  <div class="posts_section align-content-center d-flex flex-column">
    <div v-if="posts.length > 0" class="post_row card-columns">
      <a v-for="post in posts" :key="post.id" @click="$emit('onSelectPost', post)">
        <div class="post_item card mb-3">
          <ImageComponent :id="post.postImageId" :key="post.postImageId" height="unset" width="unset" htmlClass="card-img" />
        </div>
      </a>
    </div>
    <div class="text-center" v-if="posts.length > 0">
      <button @click="$emit('onLoadMore')" class="btn_circle fa fa-download"></button>
    </div>
    <span v-else class="text-center">Nothing here yet</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IPostDTO } from "@/types/IPostDTO";
import store from "@/store";
import ImageComponent from "@/components/Image.vue";

@Component({
  components: {
    ImageComponent
  }
})
export default class FollowersDetails extends Vue {
  get posts(): IPostDTO[] {
    return store.state.posts;
  }
}
</script>

<style>
</style>
