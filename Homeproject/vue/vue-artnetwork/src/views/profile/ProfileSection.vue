<template>
  <div class="profile_section">
    <div class="col-3 d-flex justify-content-center">
      <router-link v-if="isCurrentUser" :to="`/account/manage/avatar`">
        <div class="profile_image" :style="`background-color: ${rank.rankColor} !important;`">
          <ImageComponent :id="profile.profileAvatarId" :key="profile.profileAvatarId" />
        </div>
      </router-link>
      <div v-else class="profile_image" :style="`background-color: ${rank.rankColor} !important;`">
        <ImageComponent :id="profile.profileAvatarId" :key="profile.profileAvatarId" />
      </div>
    </div>
    <div class="profile_description col-9">
      <ul class="profile_meta_section">
        <li class="profile_name">{{ profile.userName }}</li>
        <li v-if="isAuthenticated && !isCurrentUser" class="profile_controls dropdown">
          <a class="btn fa fa-bars" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
          <div
            class="dropdown-menu"
            aria-labelledby="profile_more"
            x-placement="bottom-start"
            style="position: absolute; will-change: transform; top: 0px; left:
              20px; transform: translate3d(0px, 38px, 0px); text-align: center;"
          >
            <button class="dropdown-item text-center" @click="$emit('onOpenChatWithUser')">{{$t('views.profiles.WriteMessage')}}</button>
            <button v-if="!profile.isUserFollows" type="submit" class="dropdown-item" @click="$emit('onFollowProfile')">
              <i class="far fa-bell"></i>
              {{$t('views.profiles.Follow')}}
            </button>
            <button v-else type="submit" class="dropdown-item" @click="$emit('onUnfollowProfile')">
              <i class="fas fa-bell"></i>
              {{$t('views.profiles.Unfollow')}}
            </button>
            <button v-if="!profile.isUserBlocks" type="submit" class="dropdown-item" @click="$emit('onBlockProfile')">
              <i class="far fa-user"></i>
              {{$t('views.profiles.Block')}}
            </button>
            <button v-else type="submit" class="dropdown-item" @click="$emit('onUnblockProfile')">
              <i class="fas fa-user"></i>
              {{$t('views.profiles.Unblock')}}
            </button>
          </div>
        </li>
      </ul>
      <div v-if="rank" class="profile_rank" @click="$emit('onOpenRankDetails')" style="cursor: pointer;">
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
          <span class="meta_title">{{$t('views.profiles.OfPosts')}}</span>
        </li>
        <li class="profile_meta" @click="$emit('onOpenFollowers')">
          <a class="btn-link">
            <span class="meta_counter">{{ profile.followersCount }}</span>&nbsp;
            <span class="meta_title">{{$t('views.profiles.OfFollowers')}}</span>
          </a>
        </li>
        <li class="profile_meta" @click="$emit('onOpenFollowed')">
          <a class="btn-link">
            <span class="meta_counter">{{ profile.followedCount }}</span>&nbsp;
            <span class="meta_title">{{$t('views.profiles.OfFollowed')}}</span>
          </a>
        </li>
      </ul>

      <div class="profile_about">
        <h1>{{ profile.profileFullName }}</h1>
        <span>{{ profile.profileAbout }}</span>
        <br />
        <a v-if="isLink(profile.profileWorkPlace)" :href="profile.profileWorkPlace" target="_blank">{{profile.profileWorkPlace}}</a>
        <span v-else>{{profile.profileWorkPlace}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import { IProfileDTO } from "@/types/IProfileDTO";
import { IRankDTO } from "@/types/IRankDTO";
import ProfileContainer from "@/components/shared/ProfileContainer.vue";
import ImageComponent from "@/components/Image.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ProfileSection extends ProfileContainer {
  get profile(): IProfileDTO | null {
    return store.state.profile;
  }

  get rankPercent(): number {
    return store.getters.getRankPercent;
  }

  get rank(): IRankDTO | null {
    return store.state.profileRank!;
  }

  get isExpMax(): boolean {
    if (this.profile && this.rank) {
      return this.profile.experience >= this.rank.maxExperience;
    }
    return false;
  }

  get rankIcons(): string[] {
    if (store.state.profileRank?.rankIcon) {
      return store.state.profileRank.rankIcon
        .split(";")
        .filter((value) => value !== "");
    }
    return [];
  }

  isLink(url: string): boolean {
    let reg = new RegExp("(?:http(?:s)?:[/]{2})?[A-z]*[.][A-z]*(?:[/].*)?");

    return url !== null && url.search(reg) === 0;
  }
}
</script>

<style>
</style>
