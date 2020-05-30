<template>
  <div class="modal_back" @click="$emit('closeGifts')">
    <Modal v-if="isGiftSendModal && gift" v-on:closeModal="closeGiftSend">
      <GiftCreate :gift="gift" :username="username" v-on:closeModal="closeGiftSend"/>
    </Modal>
    <div class="gift_gallery_modal" @click.stop>
      <div v-for="(gift, index) in gifts" :key="index" class="profile_gift" @click="selectGift(gift)">
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

@Component({
  components: {
    ImageComponent,
    GiftCreate,
    Modal
  }
})
export default class GiftSelection extends Vue {
  @Prop()
  private gifts!: IGiftDTO[];

  @Prop()
  private username!: string;

  private isGiftSendModal: boolean = false;

  private gift: IGiftDTO | null = null;

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
}
</script>
