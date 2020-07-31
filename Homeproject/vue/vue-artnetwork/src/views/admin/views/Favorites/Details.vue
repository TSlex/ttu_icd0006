<template>
  <AdminDetailsWrapper v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">(ID)</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">Profile (ID)</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">Post (ID)</dt>
      <dd class="col-sm-10">{{model.postId}}</dd>

      <dt class="col-sm-2">Post Title</dt>
      <dd class="col-sm-10">{{model.postTitle}}</dd>

      <dt class="col-sm-2">Post Description)</dt>
      <dd class="col-sm-10">{{model.postDescription}}</dd>

      <dt class="col-sm-2">Post Image (ID)</dt>
      <dd class="col-sm-10">{{model.postImageId}}</dd>

      <dt class="col-sm-2">CreatedBy</dt>
      <dd class="col-sm-10">{{model.createdBy}}</dd>

      <dt class="col-sm-2">CreatedAt</dt>
      <dd class="col-sm-10">{{model.createdAt}}</dd>

      <dt class="col-sm-2">ChangedBy</dt>
      <dd class="col-sm-10">{{model.changedBy}}</dd>

      <dt class="col-sm-2">ChangedAt</dt>
      <dd class="col-sm-10">{{model.changedAt}}</dd>
    </dl>
  </AdminDetailsWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IFavoriteAdminDTO } from "@/types/IFavoriteDTO";

import { FavoritesApi } from "@/services/admin/FavoritesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component
export default class FavoritesDetailsA extends AdminDetails<IFavoriteAdminDTO> {
  mounted() {
    FavoritesApi.details(this.Id, this.jwt).then(
      (response: IFavoriteAdminDTO) => {
        this.model = response;
      }
    );
  }
}
</script>
