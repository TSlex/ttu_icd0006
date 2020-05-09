<template>
  <div v-if="profile" class="profile_conainer">
    <div class="profile_section">
      <div class="col-3 d-flex justify-content-center">
        <a href="/identity/account/manage/avatar">
          <div class="profile_image" style="background-color: #0066FF !important;">
            <!--<img alt width="150px" height="150px" :src="profile.profileAvatarUrl" />-->
            <ImageComponent id="08d7efa2-42f6-440f-89ba-0d0f10be4f7a" />
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
        <div class="profile_rank">
          <span class="rank_title">NO:DATA</span>
          <div class="rank_bar_back"></div>
          <div class="rank_bar" style="width: 25%; background-color: #0066FF"></div>
          <span class="rank_score">203/500</span>
          <div class="rank_icons">
            <i class="fa fa-star" />
            <i class="fa fa-star-half-alt" />
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
      <div class="profile_gift">
        <ImageComponent id="08d7efa2-42f6-440f-89ba-0d0f10be4f7a"/>
      </div>
      <a class="fa fa-gift btn btn-primary profile_gift_controls" href="#"></a>
    </div>
    <hr />
    <div class="post_section"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../components/Image.vue"
import store from "@/store";
import { IProfileDTO } from "@/types/IProfileDTO";
import { ImagesApi } from "../../services/ImagesApi";

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

  get profile(): IProfileDTO | null {
    return store.state.profile!;
  }

  beforeCreate(): void {
    console.log("beforeCreate");
  }

  created(): void {
    console.log("created");
    store.dispatch("getProfile", this.username);
  }

  beforeMount(): void {
    console.log("beforeMount");
  }

  mounted(): void {
    console.log("mounted");
    // this.scroll();
  }

  beforeUpdate(): void {
    console.log("beforeUpdate");
  }

  updated(): void {
    console.log("updated");
    // console.log(this.profile);
    // console.log(this.username);
  }

  beforeDestroy(): void {
    console.log("beforeDestroy");
  }

  destroyed(): void {
    console.log("destroyed");
  }
}
</script>
