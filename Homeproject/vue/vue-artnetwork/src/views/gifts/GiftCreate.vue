<template>
  <div>
    <h2 class="text-center">{{$t('views.gifts.SendGiftHeader', [username])}}</h2>
    <hr />
    <div class="row text-center justify-content-center">
      <div class="d-flex flex-column">
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li style="display:none"></li>
          </ul>
        </div>

        <a class="btn-link" href="/wareware_san">
          <b>{{$t('views.gifts.SendGiftTitle', [username])}}</b>
        </a>
        <div class="profile_gift">
          <ImageComponent :id="gift.giftImageId" :key="gift.giftImageId" height="300px" width="300px" classHtml="m-3" />
        </div>
        <span class="font-weight-bold">{{$t('views.gifts.Title')}}: {{gift.giftName}}</span>
        <span class="text-danger font-weight-bold">{{$t('views.gifts.Price')}}: {{gift.price}}</span>

        <div class="form-group">
          <label for="anon" class="control-label">{{$t('views.gifts.Anonymous')}}</label>
          <input type="checkbox" id="anon" class="form-control" v-model="isAnonymous" />
        </div>

        <div class="form-group">
          <label class="control-label" for="Message">{{$t('bll.profilegifts.Message')}}:</label>
          <textarea
            rows="3"
            v-model="profileGiftModel.message"
            class="form-control text-center"
            id="Message"
            maxlength="100"
            name="Message"
          ></textarea>
        </div>

        <span>{{$t('views.gifts.AreSure')}}</span>
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li style="display:none"></li>
          </ul>
        </div>
        <div class="form-group">
          <button class="btn btn-success mr-1" @click="submit">{{$t('views.common.SendButton')}}</button>
          <button class="btn btn-secondary" @click="$emit('closeModal')">{{$t('views.common.CancelButton')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import store from "@/store";

import ImageComponent from "@/components/Image.vue";

import { IGiftDTO } from "@/types/IGiftDTO";
import { IProfileGiftPostDTO } from "../../types/IProfileGiftDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { GiftsApi } from "@/services/GiftsApi";
import IdentityStore from "../../components/shared/IdentityStore.vue";

@Component({
  components: {
    ImageComponent
  }
})
export default class GiftCreate extends IdentityStore {
  @Prop()
  private gift!: IGiftDTO;

  @Prop()
  private username!: string;

  private isAnonymous: boolean = false;

  private profileGiftModel: IProfileGiftPostDTO = {
    username: this.username,
    fromUsername: null,
    giftCode: this.gift.giftCode,
    message: ""
  };

  get fromUsername() {
    return store.getters.getUserName;
  }

  submit() {
    if (!this.isAnonymous && this.fromUsername) {
      this.profileGiftModel.fromUsername = this.fromUsername;
    }

    if (!(this.profileGiftModel.message!.length > 0)) {
      this.profileGiftModel.message = null;
    }

    GiftsApi.sendGiftToUsername(
      this.username,
      this.profileGiftModel,
      this.jwt
    ).then((response: ResponseDTO) => {
      if (!response?.errors) {
        this.$swal({
          icon: "success",
          title: this.$t("views.gifts.GiftSended"),
          showConfirmButton: true
        }).then(() => {
          this.$emit("closeModal");
          this.$emit("closeGifts");
          store.dispatch("getProfileGifts", {
            userName: this.username,
            pageNumber: 1
          });
        });
      }
    });
  }
}
</script>
