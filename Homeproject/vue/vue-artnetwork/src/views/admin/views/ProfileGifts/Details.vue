<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:view-edit="onEdit" v-on:back-to-list="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.profilegifts.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.profilegifts.GiftId')}}</dt>
      <dd class="col-sm-10">{{model.giftId}}</dd>
    </dl>
    <hr />
    <div style="width: 20rem;">
      <ImageComponent
        :id="model.giftId"
        :loadGift="true"
        :key="model.giftImageId"
        htmlClass="card-img"
        height="inherit"
        width="inherit"
      />
    </div>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.profilegifts.GiftDateTime')}}</dt>
      <dd class="col-sm-10">{{model.giftDateTime | formatDate}}</dd>

      <dt class="col-sm-2">{{$t('bll.profilegifts.Price')}}</dt>
      <dd class="col-sm-10">{{model.price}}</dd>

      <dt class="col-sm-2">{{$t('bll.profilegifts.FromProfileId')}}</dt>
      <dd class="col-sm-10">{{model.fromProfileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.profilegifts.Message')}}</dt>
      <dd class="col-sm-10">{{model.message}}</dd>
    </dl>
    <hr />
    <MetaDetailsSection :model="model" />
  </AdminDetailsWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IProfileGiftAdminDTO } from "@/types/IProfileGiftDTO";

import { ProfileGiftsApi } from "@/services/admin/ProfileGiftsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ProfileGiftsDetailsA extends AdminDetails<
  IProfileGiftAdminDTO
> {
  created() {
    this.modelName = "ProfileGift";
  }

  mounted() {
    ProfileGiftsApi.details(this.Id, this.jwt).then(
      (response: IProfileGiftAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
