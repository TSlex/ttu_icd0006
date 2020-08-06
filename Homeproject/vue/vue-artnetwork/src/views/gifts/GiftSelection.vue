<template>
  <div class="modal_back" @click="$emit('gifts-close')">
    <Modal v-if="isGiftSendModal && gift" v-on:modal-close="closeGiftSend">
      <GiftCreate :gift="gift" :username="username" v-on:modal-close="closeGiftSend" />
    </Modal>
    <div class="gift_gallery_modal" @click.stop>
      <div v-for="(gift, index) in gifts" :key="index" class="profile_gift mr-3" @click="selectGift(gift)">
        <ImageComponent :id="gift.giftImageId" :key="gift.imageId" height="unset" width="unset" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import store from "@/store";
import router from "@/router";
import { Component, Prop, Vue } from "vue-property-decorator";

import ImageComponent from "@/components/Image.vue";
import Modal from "@/components/Modal.vue";
import GiftCreate from "@/views/gifts/GiftCreate.vue";

import { GiftsApi } from "@/services/GiftsApi";

import { IGiftDTO } from "@/types/IGiftDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import ProfileContainer from "@/components/shared/ProfileContainer.vue";

@Component({
  components: {
    ImageComponent,
    GiftCreate,
    Modal,
  },
})
export default class GiftSelection extends ProfileContainer {
  private gifts: IGiftDTO[] = [];
  private gift: IGiftDTO | null = null;
  private isGiftSendModal: boolean = false;

  openGiftSend() {
    this.isGiftSendModal = true;
  }

  closeGiftSend() {
    this.isGiftSendModal = false;
    this.gift = null;
  }

  selectGift(gift: IGiftDTO) {
    this.gift = gift;
    this.openGiftSend();
  }

  mounted() {
    store.dispatch("getGifts", 1).then((response: IGiftDTO[]) => {
      this.gifts = response;
    });
  }
}
</script>
