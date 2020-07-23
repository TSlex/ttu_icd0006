<template>
  <div class="profile_gift_section">
    <div
      v-for="(gift, index) in profileGifts"
      :key="index"
      class="profile_gift btn-link"
      @click="$emit('onOpenGiftDetails', gift)"
    >
      <ImageComponent :id="gift.imageId" :key="gift.imageId" />
    </div>
    <span v-if="profileGifts.length <= 0">{{$t('views.profiles.NoPresents')}}</span>

    <a
      v-if="!isCurrentUser"
      class="fa fa-gift btn btn-primary profile_gift_controls"
      @click="$emit('onOpenGiftsSelector')"
      href="#"
    ></a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import { IProfileGiftDTO } from "@/types/IProfileGiftDTO";
import ImageComponent from "@/components/Image.vue";
import ProfileContainer from "@/components/shared/ProfileContainer.vue";

@Component({
  components: {
    ImageComponent
  }
})
export default class GiftSection extends ProfileContainer {
  get profileGifts(): IProfileGiftDTO[] {
    return store.state.profileGifts;
  }
}
</script>

<style>
</style>
