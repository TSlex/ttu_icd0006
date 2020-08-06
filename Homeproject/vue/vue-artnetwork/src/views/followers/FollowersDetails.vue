<template>
  <Modal v-on:modal-close="$emit('followers-close')">
    <router-link
      v-for="follower in followers"
      :key="follower.userName"
      :to="`/profiles/${follower.userName}`"
      class="gallery_item"
    >
      <button
        v-if="isCurrentUser && isFollowedOpen"
        class="item_controls btn-link"
        @click="deleteFollowed(follower)"
        @click.prevent
      >
        <i class="fas fa-times-circle"></i>
      </button>
      <ImageComponent :id="follower.profileAvatarId" :key="follower.profileAvatarId" height="100px" width="100px" />

      <span class="item_name">{{follower.userName}}</span>
    </router-link>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import Modal from "@/components/Modal.vue";
import ImageComponent from "@/components/Image.vue";
import { IRankDTO } from "../../types/IRankDTO";
import { IFollowerDTO } from "@/types/IFollowerDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import ProfileContainer from "@/components/shared/ProfileContainer.vue";

@Component({
  components: {
    Modal,
    ImageComponent,
  },
})
export default class FollowersDetails extends ProfileContainer {
  @Prop({ default: false }) private isFollowedOpen!: boolean;

  get followers(): IFollowerDTO[] {
    return store.state.followers;
  }

  deleteFollowed(followed: IFollowerDTO) {
    if (this.isCurrentUser) {
      store.dispatch("profileUnfollow", followed.userName);
    }
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>

<style>
</style>
