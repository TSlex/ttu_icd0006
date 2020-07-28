<template>
  <div class="modal_back" @click="$emit('closeProfiles')" @click.stop>
    <div class="gift_gallery_modal" @click.stop>
      <router-link
        class="gallery_item"
        :to="`/profiles/${profile.userName}`"
        v-for="(profile, index) in profilesData"
        :key="index"
      >
        <ImageComponent :id="profile.profileAvatarId" :key="profile.profileAvatarId" height="100px" width="100px" />
        <span class="item_name">{{profile.userName}}</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IBlockedProfileDTO } from "@/types/IBlockedProfileDTO";
import { IFollowerDTO } from "@/types/IFollowerDTO";
import { IFavoriteDTO } from "@/types/IFavoriteDTO";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ProfilesModal extends Vue {
  @Prop()
  private profilesData!: IBlockedProfileDTO | IFollowerDTO | IFavoriteDTO;
}
</script>
