<template>
  <div id="profileIndex">
    <FollowersDetails v-if="isFollowersDetails" v-on:onCloseFollowers="closeFollowers" :isFollowedOpen="isFollowedOpen" />
    <PostDetails v-if="post" v-on:closePost="closePost" />
    <RanksDetails v-if="isRankDetails" v-on:onCloseRankDetails="closeRankDetails" />
    <GiftSelection v-if="isGiftSelection" v-on:closeGifts="closeGiftsSelector" />
    <GiftDetails v-if="isGiftDetails" v-on:onCloseGiftDetails="closeGiftDetails" />

    <div v-if="profile && rank" class="profile_container">
      <ProfileSection
        v-on:onOpenChatWithUser="openChatWithUser"
        v-on:onFollowProfile="followProfile"
        v-on:onUnfollowProfile="unfollowProfile"
        v-on:onBlockProfile="blockProfile"
        v-on:onUnblockProfile="unblockProfile"
        v-on:onOpenRankDetails="openRankDetails"
        v-on:onOpenFollowers="openFollowers"
        v-on:onOpenFollowed="openFollowed"
      />

      <template v-if="!(isCurrentUser && profileGifts.length <= 0)">
        <hr />
        <GiftsSection v-on:onOpenGiftDetails="openGiftDetails" v-on:onOpenGiftsSelector="openGiftsSelector" />
      </template>
      <hr />
      <PostsSection v-on:onSelectPost="selectPost" v-on:onLoadMore="loadMore" />
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import router from "@/router";

import { Component, Prop, Vue } from "vue-property-decorator";

import GiftSelection from "@/views/gifts/GiftSelection.vue";

import PostDetails from "@/views/posts/PostDetails.vue";
import GiftDetails from "@/views/gifts/GiftDetails.vue";
import RanksDetails from "@/views/ranks/RanksDetails.vue";
import FollowersDetails from "@/views/followers/FollowersDetails.vue";

import ProfileSection from "./ProfileSection.vue";
import GiftsSection from "./GiftsSection.vue";
import PostsSection from "./PostsSection.vue";
import IdentityStore from "../../components/shared/IdentityStore.vue";

import { IGiftDTO } from "@/types/IGiftDTO";
import { IProfileDTO } from "@/types/IProfileDTO";
import { IProfileGiftDTO } from "@/types/IProfileGiftDTO";
import { IPostDTO } from "@/types/IPostDTO";
import { IRankDTO } from "@/types/IRankDTO";

import { ChatRoomsApi } from "@/services/ChatRoomsApi";
import { IFollowerDTO } from "@/types/IFollowerDTO";

@Component({
  components: {
    GiftSelection,

    PostDetails,
    GiftDetails,
    RanksDetails,
    FollowersDetails,

    ProfileSection,
    GiftsSection,
    PostsSection
  }
})
export default class ProfileIndex extends IdentityStore {
  private pageToLoad = 2;
  private isFetching = false;

  private isFollowedOpen: boolean = false;

  private isRankDetails: boolean = false;
  private isGiftDetails: boolean = false;
  private isGiftSelection: boolean = false;
  private isFollowersDetails: boolean = false;

  @Prop()
  private username!: string;

  get profile(): IProfileDTO | null {
    return store.state.profile;
  }

  get rank(): IRankDTO | null {
    return store.state.profileRank;
  }

  get post(): IPostDTO | null {
    return store.state.selectedPost;
  }

  get isCurrentUser(): boolean {
    return store.getters.getUserName === this.username;
  }

  get canLoadMore(): boolean {
    return store.state.feedLoadedCount === 10;
  }

  get profileGifts(): IProfileGiftDTO[] {
    return store.state.profileGifts;
  }

  // Gift details
  openGiftDetails(gift: IProfileGiftDTO) {
    store.commit("setProfileGift", gift);
    this.isGiftDetails = true;
  }

  closeGiftDetails() {
    this.isGiftDetails = false;
    store.commit("setProfileGift", null);
  }

  // Rank details
  openRankDetails() {
    if (this.isCurrentUser) {
      this.isRankDetails = true;
    }
  }

  closeRankDetails() {
    this.isRankDetails = false;
  }

  // Gift selection
  openGiftsSelector() {
    this.isGiftSelection = true;
  }

  closeGiftsSelector() {
    this.isGiftSelection = false;
  }

  // Followers list
  openFollowers() {
    store
      .dispatch("getFollowers", { userName: this.username, pageNumber: 1 })
      .then((response: IFollowerDTO[]) => {
        this.isFollowedOpen = false;
        this.isFollowersDetails = true;
      });
  }

  openFollowed() {
    store
      .dispatch("getFollowed", { userName: this.username, pageNumber: 1 })
      .then((response: IFollowerDTO[]) => {
        this.isFollowedOpen = true;
        this.isFollowersDetails = true;
      });
  }

  closeFollowers() {
    this.isFollowersDetails = false;
    this.isFollowedOpen = false;

    store.commit("setFollowers", []);
  }

  // Post selection
  selectPost(post: IPostDTO) {
    store.commit("setPost", post);
  }

  closePost() {
    store.commit("setPost", null);
  }

  loadMore() {
    if (!this.isFetching) {
      this.isFetching = true;
      store
        .dispatch("getPosts", {
          userName: this.username,
          pageNumber: this.pageToLoad
        })
        .then(() => {
          this.isFetching = false;
          this.pageToLoad += 1;
        });
    }
  }

  openChatWithUser() {
    if (!this.isCurrentUser) {
      ChatRoomsApi.getChatRoomWithUsername(this.username, this.jwt).then(
        (result: string | null) => {
          if (result) {
            router.push(`/messages/${result}`);
          }
        }
      );
    }
  }

  followProfile() {
    if (!this.isCurrentUser) {
      store.dispatch("profileFollow", this.username);
    }
  }

  unfollowProfile() {
    if (!this.isCurrentUser) {
      store.dispatch("profileUnfollow", this.username);
    }
  }

  blockProfile() {
    if (!this.isCurrentUser) {
      store.dispatch("profileBlock", this.username);
    }
  }

  unblockProfile() {
    if (!this.isCurrentUser) {
      store.dispatch("profileUnblock", this.username);
    }
  }

  created(): void {
    store.dispatch("getProfile", this.username);
    store.dispatch("getProfileRank", this.username);
    store.dispatch("setPosts", { userName: this.username, pageNumber: 1 });
    store.dispatch("getProfileGifts", {
      userName: this.username,
      pageNumber: 1
    });
  }
}
</script>
