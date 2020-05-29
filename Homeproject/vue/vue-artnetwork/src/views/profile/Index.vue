<template>
  <div id="profileIndex">
    <Modal v-if="followers" v-on:closeModal="closeFollowers">
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
    <GiftSelection v-if="gifts" :gifts="gifts" :username="username" v-on:closeGifts="closeGiftsSelector" />
    <PostDetails v-if="post" :post="post" v-on:closePost="closePost" />
    <Modal v-if="isRankDetails" v-on:closeModal="closeRankDetails">
      <div class="d-flex flex-column align-items-center text-center" style="position: relative; padding: 20px">
        <div
          class="progress_container"
          :style="`background: conic-gradient(${rank.rankColor} ${rankPercent}%, #FFFFFF ${rankPercent + 5}%) 50% 50% / 100% 100% no-repeat;`"
        >
          <div class="progress_container_front">
            <span class="progress_value">{{rankPercent}}%</span>
          </div>
        </div>
        <span
          class="mt-4"
          :style="`color: ${rank.rankTextColor}; font-size: 24px; font-family: Consolas, serif`"
        >{{rank.rankTitle}}</span>
        <hr style="width: 400px" />
        <span
          style="display: inline-block; max-width: 600px; word-break: break-all; word-break: break-word;"
        >{{rank.rankDescription}}</span>
      </div>
    </Modal>
    <Modal v-if="isGiftDetails" v-on:closeModal="closeGiftDetails">
      <div class="d-flex flex-column align-items-center" style="position: relative">
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li style="display:none"></li>
          </ul>
        </div>

        <div class="profile_gift">
          <img src="/images/00000000-0000-0000-0000-000000000002" alt style="height: 300px; width: 300px;" class="m-3" />
        </div>
        <span class="font-weight-bold">Together forever!</span>

        <span class="font-weight-bold mt-2">From "admin"</span>
        <span class="font-weight-bold mt-2">Message:</span>
        <div
          style="color: black !important; margin: auto; max-width: 400px; overflow: hidden; text-overflow: ellipsis; word-break: break-word"
        >sdasdasdas</div>

        <hr />
        <span>[27/05/2020 15:36:26]</span>
      </div>
    </Modal>
    <div v-if="profile && rank" class="profile_conainer">
      <div class="profile_section">
        <div class="col-3 d-flex justify-content-center">
          <router-link v-if="isCurrentUser" :to="`/account/manage/avatar`">
            <div class="profile_image" :style="`background-color: ${rank.rankColor} !important;`">
              <ImageComponent :id="profile.profileAvatarId" :key="profile.profileAvatarId"/>
            </div>
          </router-link>
          <div v-else class="profile_image" :style="`background-color: ${rank.rankColor} !important;`">
            <ImageComponent :id="profile.profileAvatarId" :key="profile.profileAvatarId"/>
          </div>
        </div>
        <div class="profile_description col-9">
          <ul class="profile_meta_section">
            <li class="profile_name">{{ profile.userName }}</li>
            <li v-if="!isCurrentUser" class="profile_controls dropdown">
              <a class="btn fa fa-bars" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
              <div
                class="dropdown-menu"
                aria-labelledby="profile_more"
                x-placement="bottom-start"
                style="position: absolute; will-change: transform; top: 0px; left:
              20px; transform: translate3d(0px, 38px, 0px);"
              >
                <button class="dropdown-item text-center" @click="openChatWithUser">Write a Message</button>
                <button v-if="!profile.isUserFollows" type="submit" class="dropdown-item" @click="followProfile">
                  <i class="far fa-bell"></i> Follow
                </button>
                <button v-else type="submit" class="dropdown-item" @click="unfollowProfile">
                  <i class="fas fa-bell"></i> Unfollow
                </button>
                <button v-if="!profile.isUserBlocks" type="submit" class="dropdown-item" @click="blockProfile">
                  <i class="far fa-user"></i> Block
                </button>
                <button v-else type="submit" class="dropdown-item" @click="unblockProfile">
                  <i class="fas fa-user"></i> Unblock
                </button>
              </div>
            </li>
          </ul>
          <div v-if="rank" class="profile_rank" @click="openRankDetails" style="cursor: pointer;">
            <span class="rank_title" :style="`color: ${rank.textColor}`">{{rank.rankTitle}}</span>
            <div class="rank_bar_back"></div>
            <div class="rank_bar" :style="`width: ${rankPercent}%; background-color: ${rank.rankColor}`"></div>
            <span v-if="!isExpMax" class="rank_score">{{profile.experience}}/{{rank.maxExperience}}</span>
            <span v-else class="rank_score">MAX</span>
            <div class="rank_icons">
              <i v-for="(icon, i) in rankIcons" :key="i" :class="'fa fa-' + icon" />
            </div>
          </div>

          <ul class="profile_meta_section">
            <li class="profile_meta">
              <span class="meta_counter">{{ profile.postsCount }}</span>&nbsp;
              <span class="meta_title">posts</span>
            </li>
            <li class="profile_meta" @click="openFollowers">
              <a class="btn-link">
                <span class="meta_counter">{{ profile.followersCount }}</span>&nbsp;
                <span class="meta_title">followers</span>
              </a>
            </li>
            <li class="profile_meta" @click="openFollowed">
              <a class="btn-link">
                <span class="meta_counter">{{ profile.followedCount }}</span>&nbsp;
                <span class="meta_title">followed</span>
              </a>
            </li>
          </ul>

          <div class="profile_about">
            <h1>{{ profile.profileFullName }}</h1>
            <span>{{ profile.profileAbout }}</span>
            <br />
            <a
              v-if="isLink(profile.profileWorkPlace)"
              :href="profile.profileWorkPlace"
              target="_blank"
            >{{profile.profileWorkPlace}}</a>
            <span v-else>{{profile.profileWorkPlace}}</span>
          </div>
        </div>
      </div>
      <template v-if="!(isCurrentUser && profileGifts.length <= 0)">
        <hr />
        <div class="profile_gift_section">
          <div v-for="(gift, index) in profileGifts" :key="index" class="profile_gift btn-link" @click="openGiftDetails(gift)">
            <ImageComponent :id="gift.imageId" :key="gift.imageId" />
          </div>
          <span v-if="profileGifts.length <= 0">This user has no gifts yet. Give? :)</span>

          <a v-if="!isCurrentUser" class="fa fa-gift btn btn-primary profile_gift_controls" @click="openGiftsSelector" href="#"></a>
        </div>
      </template>
      <hr />
      <div class="posts_section align-content-center d-flex flex-column">
        <div v-if="posts.length > 0" class="post_row card-columns">
          <a v-for="post in posts" :key="post.id" @click="selectPost(post)">
            <div class="post_item card mb-3">
              <ImageComponent
                :id="post.postImageId"
                :key="post.postImageId"
                height="unset"
                width="unset"
                htmlClass="card-img"
              />
            </div>
          </a>
        </div>
        <div class="text-center" v-if="posts.length > 0">
          <button @click="loadMore" class="btn_circle fa fa-download"></button>
        </div>
        <span v-else class="text-center">Nothing here yet</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../components/Image.vue";
import PostDetails from "../../components/PostDetails.vue";
import ProfilesModal from "../../components/ProfilesModal.vue";
import Modal from "../../components/Modal.vue";
import GiftSelection from "../../components/GiftSelection.vue";
import store from "@/store";
import router from "../../router";
import { IProfileDTO } from "@/types/IProfileDTO";
import { ImagesApi } from "../../services/ImagesApi";
import { IPostDTO } from "../../types/IPostDTO";
import { IGiftDTO } from "../../types/IGiftDTO";
import { IRankDTO } from "../../types/IRankDTO";
import { ResponseDTO } from "../../types/Response/ResponseDTO";
import { ChatRoomsApi } from "../../services/ChatRoomsApi";
import { ProfileApi } from "@/services/ProfileApi";
import { IFollowerDTO } from "../../types/IFollowerDTO";
import { IBlockedProfileDTO } from "../../types/IBlockedProfileDTO";

@Component({
  components: {
    ImageComponent,
    PostDetails,
    ProfilesModal,
    Modal,
    GiftSelection
  }
})
export default class ProfileIndex extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  private post: IPostDTO | null = null;
  private gift: IProfileDTO | null = null;

  private followers: IFollowerDTO[] | null = null;
  private gifts: IGiftDTO[] | null = null;

  private isFollowedOpen: boolean = false;

  private isRankDetails: boolean = false;
  private isGiftDetails: boolean = false;

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
        ((profile.experience - minExperience) /
          (rank.maxExperience - minExperience)) *
        100
      );
    }
    return 0;
  }

  get jwt() {
    return store.getters.getJwt;
  }

  get profileGifts(): IGiftDTO[] {
    return store.state.profileGifts;
  }

  get posts(): IPostDTO[] {
    return store.state.posts;
  }

  isLink(url: string): boolean {
    let reg = new RegExp("(?:http(?:s)?:[/]{2})?[A-z]*[.][A-z]*(?:[/].*)?");

    return url !== null && url.search(reg) === 0;
  }

  openGiftDetails(gift: IProfileDTO) {
    this.gift = gift;
    this.isGiftDetails = true;
  }

  closeGiftDetails() {
    this.isGiftDetails = false;
    this.gift = null;
  }

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
        this.followers = response;
      });
  }

  openFollowed() {
    store
      .dispatch("getFollowed", { userName: this.username, pageNumber: 1 })
      .then((response: IFollowerDTO[]) => {
        this.isFollowedOpen = true;
        this.followers = response;
      });
  }

  closeFollowers() {
    this.isFollowedOpen = false;
    this.followers = null;
  }

  deleteFollowed(followed: IFollowerDTO) {
    if (this.isCurrentUser) {
      store
        .dispatch("profileUnfollow", followed.userName)
        .then((response: ResponseDTO) => {
          this.profile!.followedCount -= 1;
          if (this.followers) {
            this.followers!.forEach((element: IFollowerDTO, index) => {
              if (element.userName === followed.userName) {
                this.followers!.splice(index, 1);
              }
            });
          }
        });
    }
  }

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
      ProfileApi.follow(this.username, this.jwt).then(
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
      ProfileApi.unfollow(this.username, this.jwt).then(
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
      ProfileApi.block(this.username, this.jwt).then(
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
      ProfileApi.unblock(this.username, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors && this.profile) {
            store.dispatch("getProfile", this.username);
          }
        }
      );
    }
  }

  beforeCreate(): void {
    console.log("beforeCreate");
  }

  created(): void {
    console.log("created");
    store.dispatch("getProfile", this.username);
    store.dispatch("getProfileRank", this.username);
    store.dispatch("setPosts", { userName: this.username, pageNumber: 1 });
    store.dispatch("getProfileGifts", {
      userName: this.username,
      pageNumber: 1
    });
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
    console.log(this.username);
  }

  beforeDestroy(): void {
    console.log("beforeDestroy");
  }

  destroyed(): void {
    console.log("destroyed");
  }
}
</script>
