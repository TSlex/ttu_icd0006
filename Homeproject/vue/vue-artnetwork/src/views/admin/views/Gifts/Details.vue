<template>
  <div v-if="Id && model">
    <h1>Details</h1>

    <div>
      <h4>Gift</h4>
      <hr />
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
    </div>
    <div>
      <button class="btn btn-primary mr-1" @click="onEdit(model.id)">Edit</button>
      <button class="btn btn-primary" @click="$router.go(-1)">Back to List</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IGiftAdminDTO } from "@/types/IGiftDTO";

import { GiftsApi } from "@/services/admin/GiftsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent,
  },
})
export default class GiftsDetailsA extends Vue {
  @Prop()
  private id!: string;

  private model: IGiftAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  onEdit(id: string) {
    router.push({ name: "GiftsEditA", params: { id } });
  }

  mounted() {
    GiftsApi.details(this.Id, this.jwt).then((response: IGiftAdminDTO) => {
      this.model = response;
    });
  }
}
</script>
