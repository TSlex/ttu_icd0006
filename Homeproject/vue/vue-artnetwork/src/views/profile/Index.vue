<template>
  <div id="profileIndex">
    <FollowersDetails
      v-if="isFollowersDetails"
      v-on:onCloseFollowers="closeFollowers"
      :username="username"
      :isFollowedOpen="isFollowedOpen"
    />

    <PostDetails v-if="post" :post="post" v-on:closePost="closePost" />
    <RanksDetails v-if="isRankDetails" :rank="rank" :rankPercent="rankPercent" v-on:onCloseRankDetails="closeRankDetails" />
    <GiftSelection v-if="gifts" :gifts="gifts" :username="username" v-on:closeGifts="closeGiftsSelector" />
    <GiftDetails v-if="isGiftDetails" :username="username" :gift="gift" v-on:onCloseGiftDetails="closeGiftDetails" />

    <div v-if="profile && rank" class="profile_container">
      <ProfileSection
        :rankPercent="rankPercent"
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

import ImageComponent from "@/components/Image.vue";

import ProfilesModal from "@/components/ProfilesModal.vue";
import Modal from "@/components/Modal.vue";
import GiftSelection from "@/views/gifts/GiftSelection.vue";
import { IProfileDTO } from "@/types/IProfileDTO";
import { ImagesApi } from "@/services/ImagesApi";
import { IPostDTO } from "@/types/IPostDTO";
import { IProfileGiftDTO } from "@/types/IProfileGiftDTO";
import { IRankDTO } from "@/types/IRankDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { ChatRoomsApi } from "@/services/ChatRoomsApi";
import { ProfilesApi } from "@/services/ProfilesApi";
import { IFollowerDTO } from "@/types/IFollowerDTO";
import { IBlockedProfileDTO } from "@/types/IBlockedProfileDTO";
import { IGiftDTO } from "@/types/IGiftDTO";

import PostDetails from "@/views/posts/PostDetails.vue";
import GiftDetails from "@/views/gifts/GiftDetails.vue";
import RanksDetails from "@/views/ranks/RanksDetails.vue";
import FollowersDetails from "@/views/followers/FollowersDetails.vue";

import ProfileSection from "./ProfileSection.vue";
import GiftsSection from "./GiftsSection.vue";
import PostsSection from "./PostsSection.vue";

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
export default class ProfileIndex extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  private post: IPostDTO | null = null;
  private gift: IProfileGiftDTO | null = null;

  private followers: IFollowerDTO[] | null = null;
  private gifts: IGiftDTO[] | null = null;

  private isFollowedOpen: boolean = false;

  private isRankDetails: boolean = false;
  private isGiftDetails: boolean = false;
  private isFollowersDetails: boolean = false;

  @Prop()
  private username!: string;

  get isCurrentUser(): boolean {
    return store.getters.getUserName === this.username;
  }

  get canLoadMore(): boolean {
    return store.state.feedLoadedCount === 10;
  }

  get profile(): IProfileDTO | null {
    return store.state.profile!;
  }

  get isExpMax(): boolean {
    if (this.profile && this.rank) {
      return this.profile.experience === this.rank.maxExperience;
    }
    return false;
  }

  get rank(): IRankDTO | null {
    return store.state.profileRank!;
  }

  get rankIcons(): string[] {
    if (store.state.profileRank?.rankIcon) {
      return store.state.profileRank.rankIcon
        .split(";")
        .filter(value => value !== "");
    }
    return [];
  }

  get rankPercent(): number {
    let profile = this.profile;
    let rank = this.rank;

    if (profile && rank && rank.maxExperience - rank.minExperience !== 0) {
      let minExperience = rank.minExperience >= 0 ? rank.minExperience : 0;

      return (
        Math.round(
          ((profile.experience - minExperience) /
            (rank.maxExperience - minExperience)) *
            100 *
            100
        ) / 100
      );
    }
    return 0;
  }

  get jwt() {
    return store.getters.getJwt;
  }

  get profileGifts(): IProfileGiftDTO[] {
    return store.state.profileGifts;
  }

  get posts(): IPostDTO[] {
    return store.state.posts;
  }

  isLink(url: string): boolean {
    let reg = new RegExp("(?:http(?:s)?:[/]{2})?[A-z]*[.][A-z]*(?:[/].*)?");

    return url !== null && url.search(reg) === 0;
  }

  // deleteProfileGift(gift: IProfileGiftDTO) {
  //   if (this.isCurrentUser) {
  //     store.dispatch("deleteProfileGift", gift).then(() => {
  //       this.closeGiftDetails()
  //     });
  //   }
  // }

  // Gift details
  openGiftDetails(gift: IProfileGiftDTO) {
    this.gift = gift;
    this.isGiftDetails = true;
  }

  closeGiftDetails() {
    this.isGiftDetails = false;
    this.gift = null;
  }

  // Rank details
  openRankDetails() {
    if (this.rank && this.isCurrentUser) {
      this.isRankDetails = true;
    }
  }

  closeRankDetails() {
    this.isRankDetails = false;
  }

  openGiftsSelector() {
    store.dispatch("getGifts", 1).then((response: IGiftDTO[]) => {
      this.gifts = response;
    });
  }

  closeGiftsSelector() {
    this.gifts = null;
  }

  openFollowers() {
    store
      .dispatch("getFollowers", { userName: this.username, pageNumber: 1 })
      .then((response: IFollowerDTO[]) => {
        this.isFollowedOpen = false;
        this.isFollowersDetails = true;
        this.followers = response;
      });
  }

  openFollowed() {
    store
      .dispatch("getFollowed", { userName: this.username, pageNumber: 1 })
      .then((response: IFollowerDTO[]) => {
        this.isFollowedOpen = true;
        this.isFollowersDetails = true;
        this.followers = response;
      });
  }

  closeFollowers() {
    this.isFollowersDetails = false;
    this.isFollowedOpen = false;
    this.followers = null;
  }

  // deleteFollowed(followed: IFollowerDTO) {
  //   if (this.isCurrentUser) {
  //     store
  //       .dispatch("profileUnfollow", followed.userName)
  //       .then((response: ResponseDTO) => {
  //         this.profile!.followedCount -= 1;
  //         if (this.followers) {
  //           this.followers!.forEach((element: IFollowerDTO, index) => {
  //             if (element.userName === followed.userName) {
  //               this.followers!.splice(index, 1);
  //             }
  //           });
  //         }
  //       });
  //   }
  // }

  selectPost(post: IPostDTO) {
    this.post = post;
  }

  closePost() {
    this.post = null;
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
      ProfilesApi.follow(this.username, this.jwt).then(
        (response: ResponseDTO) => {
          console.log(response);
          if (!response.errors && this.profile) {
            store.dispatch("getProfile", this.username);
          }
        }
      );
    }
  }

  unfollowProfile() {
    if (!this.isCurrentUser) {
      ProfilesApi.unfollow(this.username, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors && this.profile) {
            store.dispatch("getProfile", this.username);
          }
        }
      );
    }
  }

  blockProfile() {
    if (!this.isCurrentUser) {
      ProfilesApi.block(this.username, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors && this.profile) {
            store.dispatch("getProfile", this.username);
          }
        }
      );
    }
  }

  unblockProfile() {
    if (!this.isCurrentUser) {
      ProfilesApi.unblock(this.username, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors && this.profile) {
            store.dispatch("getProfile", this.username);
          }
        }
      );
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
