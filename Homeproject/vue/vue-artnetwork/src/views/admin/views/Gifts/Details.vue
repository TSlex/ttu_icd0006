<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>
      <dt class="col-sm-2">{{$t('bll.gifts.GiftNameId')}}</dt>
      <dd class="col-sm-10">{{model.giftNameId}}</dd>
    </dl>
    <hr />
    <div style="width: 20rem;">
      <ImageComponent :id="model.giftImageId" :key="model.giftImageId" htmlClass="card-img" height="inherit" width="inherit" />
    </div>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.gifts.GiftName')}}</dt>
      <dd class="col-sm-10">{{model.giftName}}</dd>
      <dt class="col-sm-2">{{$t('bll.gifts.GiftCode')}}</dt>
      <dd class="col-sm-10">{{model.giftCode}}</dd>
      <dt class="col-sm-2">{{$t('bll.gifts.Price')}}</dt>
      <dd class="col-sm-10">{{model.price}}</dd>
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

import { IGiftAdminDTO } from "@/types/IGiftDTO";

import { GiftsApi } from "@/services/admin/GiftsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";
import EventBus from "@/events/EventBus";

@Component({
  components: {
    ImageComponent,
  },
})
export default class GiftsDetailsA extends AdminDetails<IGiftAdminDTO> {
  loadData() {
    this.isLoaded = false;

    GiftsApi.details(this.Id, this.jwt).then((response: IGiftAdminDTO) => {
      this.model = response;
      this.isLoaded = true;
    });
  }

  created() {
    this.modelName = "Gift";

    EventBus.$on("cultureUpdate", (culture: string) => {
      this.loadData();
    });
  }

  mounted() {
    this.loadData();
  }
}
</script>
