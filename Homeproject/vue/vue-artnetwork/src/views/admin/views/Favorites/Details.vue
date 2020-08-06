<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:view-edit="onEdit" v-on:back-to-list="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.favorites.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.favorites.PostId')}}</dt>
      <dd class="col-sm-10">{{model.postId}}</dd>
    </dl>
    <hr />
    <ImageComponent :id="model.postImageId" height="unset" width="unset" htmlClass="card-img" htmlParentStyle="width: 20rem;" />
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.favorites.PostTitle')}}</dt>
      <dd class="col-sm-10">{{model.postTitle}}</dd>

      <dt class="col-sm-2">{{$t('bll.favorites.PostDescription')}}</dt>
      <dd class="col-sm-10">{{model.postDescription}}</dd>
    </dl>
    <hr />
    <MetaDetailsSection :model="model" :deletable="false" />
  </AdminDetailsWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IFavoriteAdminDTO } from "@/types/IFavoriteDTO";

import { FavoritesApi } from "@/services/admin/FavoritesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

import ImageComponent from "@/components/Image.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class FavoritesDetailsA extends AdminDetails<IFavoriteAdminDTO> {
  created() {
    this.modelName = "Favorite";
  }

  mounted() {
    FavoritesApi.details(this.Id, this.jwt).then(
      (response: IFavoriteAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
