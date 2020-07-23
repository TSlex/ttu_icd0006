<template>
  <Modal v-on:closeModal="$emit('onCloseGiftDetails')">
    <div class="d-flex flex-column align-items-center" style="position: relative">
      <button
        v-if="isCurrentUser"
        class="item_controls btn-link"
        style="position: absolute; right: 0"
        @click="deleteProfileGift(gift)"
        @click.prevent
      >
        <i class="fas fa-times-circle"></i>
      </button>
      <div>
        <ImageComponent :id="gift.imageId" :key="gift.imageId" height="300px" width="300px" />
      </div>
      <span class="font-weight-bold">{{gift.giftName}}</span>

      <span v-if="gift.fromUsername" class="font-weight-bold mt-2">From "{{gift.fromUsername}}"</span>
      <span v-else class="font-weight-bold mt-2">{{$t('views.gifts.Anonymous')}}</span>
      <template v-if="gift.message">
        <span class="font-weight-bold mt-2">{{$t('bll.profilegifts.Message')}}:</span>
        <div
          style="color: black !important; margin: auto; max-width: 400px; overflow: hidden; text-overflow: ellipsis; word-break: break-word"
        >{{gift.message}}</div>
      </template>
      <hr />
      <span>[{{gift.giftDateTime | formatDate}}]</span>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IProfileGiftDTO } from "@/types/IProfileGiftDTO";
import store from "@/store";
import ImageComponent from "@/components/Image.vue";
import Modal from "@/components/Modal.vue";
import ProfileContainer from "@/components/shared/ProfileContainer.vue";

@Component({
  components: {
    Modal,
    ImageComponent
  }
})
export default class GiftDetails extends ProfileContainer {
  get gift(): IProfileGiftDTO | null {
    return store.state.profileGift;
  }

  deleteProfileGift() {
    if (this.isCurrentUser) {
      store.dispatch("deleteProfileGift", this.gift).then(() => {
        this.$emit("onCloseGiftDetails");
      });
    }
  }
}
</script>

<style>
</style>
