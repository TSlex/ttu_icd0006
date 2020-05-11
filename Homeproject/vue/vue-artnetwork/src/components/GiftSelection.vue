<template>
  <div class="modal_back" @click="$emit('closeGifts')">
    <div class="gift_gallery_modal" @click.stop>
      <div v-for="(gift, index) in gifts" :key="index" class="profile_gift">
        <img :src="gift.giftImageUrl" alt="gift" @click="selectGift(gift)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";
import { IGiftDTO } from "@/types/IGiftDTO";
import { GiftsApi } from "../services/GiftsApi";
import { ResponseDTO } from '@/types/Response/ResponseDTO';

@Component
export default class GiftSelection extends Vue {
  @Prop()
  private gifts!: IGiftDTO[];

  @Prop()
  private username!: string;

  get jwt() {
    return store.getters.getJwt;
  }

  selectGift(gift: IGiftDTO) {
    this.$swal({
      title: "Are you sure?",
      html: `<p>This gift will be sended to ${this.username}</p>
      <p>Gift Code: <b>${gift.giftCode}</b></p>
      <p>Price: <b>${gift.price}</b></p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send"
    }).then((result: any) => {
      if (result.value) {
        GiftsApi.sendGiftToUsername(
          this.username,
          gift.giftCode,
          this.jwt
        ).then((response: ResponseDTO) => {
          console.log(response)
          if (!response.errors) {
            this.$swal(
              "Sended!",
              `${this.username} is going to be so-so happy C:`,
              "success"
            ).then(() => {
              this.$emit("closeGifts");
            });
          }
        });
      }
    });
  }
}
</script>
