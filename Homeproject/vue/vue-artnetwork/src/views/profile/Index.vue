<template>
  <div v-if="profile && rank" class="profile_conainer">
    <div class="profile_section">
      <div class="col-3 d-flex justify-content-center">
        <a href="/identity/account/manage/avatar">
          <div class="profile_image" :style="`background-color: ${rank.rankColor} !important;`">
            <!--<img alt width="150px" height="150px" :src="profile.profileAvatarUrl" />-->
            <ImageComponent :id="profile.profileAvatarId" />
          </div>
        </a>
      </div>
      <div class="profile_description col-9">
        <ul class="profile_meta_section">
          <li class="profile_name">{{ profile.userName }}</li>
          <li class="profile_controls dropdown">
            <a class="btn fa fa-bars" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
            <div
              class="dropdown-menu"
              aria-labelledby="profile_more"
              x-placement="bottom-start"
              style="position: absolute; will-change: transform; top: 0px; left:
              20px; transform: translate3d(0px, 38px, 0px);"
            >
              <a class="dropdown-item text-center" href="/chatrooms/openorcreate?username=wareware_san">Write a Message</a>
              <form method="post" action="/wareware_san/followprofile">
                <button type="submit" class="dropdown-item">
                  <i class="far fa-bell"></i> Follow
                </button>

                <input
                  type="hidden"
                  data-val="true"
                  data-val-required="The UserName field is required."
                  id="UserName"
                  name="UserName"
                  value="wareware_san"
                />
              </form>
              <form method="post" action="/wareware_san/blockprofile">
                <button type="submit" class="dropdown-item">
                  <i class="far fa-user"></i> Block
                </button>
                <input
                  type="hidden"
                  data-val="true"
                  data-val-required="The UserName field is required."
                  id="UserName"
                  name="UserName"
                  value="wareware_san"
                />
              </form>
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
        <div v-for="(gift, index) in gifts" :key="index" class="profile_gift">
          <img :src="gift.giftImageUrl" alt="gift" />
        </div>
      </div>
      <a class="fa fa-gift btn btn-primary profile_gift_controls" href="#"></a>
    </div>
    <hr />
    <div class="post_section">
      <div class="post_row card-columns">
        <a v-for="post in posts" :key="post.id" href="#">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../components/Image.vue";
import store from "@/store";
import { IProfileDTO } from "@/types/IProfileDTO";
import { ImagesApi } from "../../services/ImagesApi";
import { IPostDTO } from "../../types/IPostDTO";
import { IGiftDTO } from "../../types/IGiftDTO";
import { IRankDTO } from "../../types/IRankDTO";

@Component({
  components: {
    ImageComponent
  }
})
export default class ProfileIndex extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  @Prop()
  private username!: string;

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
        .filter(value => value !== '');
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

  get gifts(): IGiftDTO[] {
    return store.state.profileGifts;
  }

  get posts(): IPostDTO[] {
    return store.state.posts;
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
  }

  beforeDestroy(): void {
    console.log("beforeDestroy");
  }

  destroyed(): void {
    console.log("destroyed");
  }
}
</script>
