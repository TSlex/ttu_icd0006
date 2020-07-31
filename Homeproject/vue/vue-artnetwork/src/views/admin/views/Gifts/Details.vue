<template>
  <AdminDetailsWrapper v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">(ID)</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">Profile (ID)</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">Room (ID)</dt>
      <dd class="col-sm-10">{{model.chatRoomId}}</dd>

      <dt class="col-sm-2">Value</dt>
      <dd class="col-sm-10">{{model.messageValue}}</dd>

      <dt class="col-sm-2">DateTime</dt>
      <dd class="col-sm-10">{{model.messageDateTime}}</dd>

      <dt class="col-sm-2">CreatedBy</dt>
      <dd class="col-sm-10">{{model.createdBy}}</dd>

      <dt class="col-sm-2">CreatedAt</dt>
      <dd class="col-sm-10">{{model.createdAt}}</dd>

      <dt class="col-sm-2">ChangedBy</dt>
      <dd class="col-sm-10">{{model.changedBy}}</dd>

      <dt class="col-sm-2">ChangedAt</dt>
      <dd class="col-sm-10">{{model.changedAt}}</dd>

      <dt class="col-sm-2">DeletedBy</dt>
      <dd class="col-sm-10">{{model.deletedBy}}</dd>

      <dt class="col-sm-2">DeletedAt</dt>
      <dd class="col-sm-10">{{model.deletedAt}}</dd>
    </dl>
  </AdminDetailsWrapper>
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

@Component({
  components: {
    ImageComponent,
  },
})
export default class GiftsDetailsA extends AdminDetails<IGiftAdminDTO> {
  mounted() {
    GiftsApi.details(this.Id, this.jwt).then((response: IGiftAdminDTO) => {
      this.model = response;
    });
  }
}
</script>
