<template>
  <div id="profileIndex">
    <ProfilesModal v-if="followers" :profilesData="followers" v-on:closeProfiles="closeFollowers" />
    <GiftSelection v-if="gifts" :gifts="gifts" :username="username" v-on:closeGifts="closeGiftsSelector" />
    <PostDetails v-if="post" :post="post" v-on:closePost="closePost" />
    <div v-if="profile && rank" class="profile_conainer">
      <div class="profile_section">
        <div class="col-3 d-flex justify-content-center">
          <a href="/identity/account/manage/avatar">
            <div class="profile_image" :style="`background-color: ${rank.rankColor} !important;`">
              <!--<img alt width="150px" height="150px" :src="profile.profileAvatarUrl" />-->
              <ImageComponent :id="profile.profileAvatarId" :key="profile.profileAvatarId" />
            </div>
          </a>
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
          <div v-if="rank" class="profile_rank">
            <span class="rank_title" :style="`color: ${rank.textColor}`">{{rank.rankTitle}}</span>
            <div class="rank_bar_back"></div>
            <div class="rank_bar" :style="`width: ${rankPercent}%; background-color: ${rank.rankColor}`"></div>
            <span class="rank_score">{{profile.experience}}/{{rank.maxExperience}}</span>
            <div class="rank_icons">
              <i v-for="(icon, i) in rankIcons" :key="i" :class="'fa fa-' + icon" />
            </div>
          </div>

          <ul class="profile_meta_section">
            <li class="profile_meta">
              <span class="meta_counter">{{ profile.postsCount }}</span>&nbsp;
              <span class="meta_title">posts</span>
            </li>
            <li class="profile_meta">
              <span class="meta_counter">{{ profile.followersCount }}</span>&nbsp;
              <span class="meta_title">followers</span>
            </li>
            <li class="profile_meta">
              <span class="meta_counter">{{ profile.followedCount }}</span>&nbsp;
              <span class="meta_title">followed</span>
            </li>
          </ul>

          <div class="profile_about">
            <h1>{{ profile.profileFullName }}</h1>
            <span>{{ profile.profileAbout }}</span>
            <br />
            <a :href="'//' + profile.profileWorkPlace" target="_blank">
              {{
              profile.profileWorkPlace
              }}
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div class="profile_gift_section">
        <div class="gift_carousel">
          <div v-for="(gift, index) in profileGifts" :key="index" class="profile_gift">
            <img :src="gift.giftImageUrl" alt="gift" />
          </div>
        </div>
        <a class="fa fa-gift btn btn-primary profile_gift_controls" @click="openGiftsSelector" href="#"></a>
      </div>
      <hr />
      <div class="post_section">
        <div class="post_row card-columns">
          <a v-for="post in posts" :key="post.id" @click="selectPost(post)">
            <div class="post_item card">
              <img alt="post" :src="post.postImageUrl" class="post_image card-img" />
            </div>
          </a>
        </div>
      </div>
      <div class="text-center">
        <button @click="loadMore" class="btn_circle fa fa-download"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../components/Image.vue";
import PostDetails from "../../components/PostDetails.vue";
import ProfilesModal from "../../components/ProfilesModal.vue";
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
// import VueRouter from 'vue-router';

// const router = new VueRouter({
//   routes: [
//     { path: '/user/:id', component: ProfileIndex }
//   ]
// })

@Component({
  components: {
    ImageComponent,
    PostDetails,
    ProfilesModal,
    GiftSelection
  },
  // data() {
  //   return {
  //     renderComponent: true
  //   };
  // },
  // beforeRouteUpdate(to, from, next): void {
  //   () => {this.$el.}
  // }
})
export default class ProfileIndex extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  private post: IPostDTO | null = null;

  private followers: IFollowerDTO[] | null = null;
  private gifts: IGiftDTO[] | null = null;

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

    if (profile && rank && rank.maxExperience !== 0) {
      return (
        ((profile.experience - rank.minExperience) / rank.maxExperience) * 100
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
        this.followers = response;
      });
  }

  closeFollowers() {
    this.gifts = null;
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
