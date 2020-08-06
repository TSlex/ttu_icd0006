<template>
  <AdminEditWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:back-to-list="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="profileId">{{$t('bll.favorites.ProfileId')}}*</label>
      <input class="form-control" type="text" required id="profileId" name="profileId" v-model="model.profileId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="postId">{{$t('bll.favorites.PostId')}}*</label>
      <input class="form-control" type="text" required id="postId" name="postId" v-model="model.postId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="postTitle">{{$t('bll.favorites.PostTitle')}}</label>
      <input class="form-control" type="text" id="postTitle" name="postTitle" v-model="model.postTitle" />
    </div>
    <div class="form-group">
      <label class="control-label" for="postDescription">{{$t('bll.favorites.PostDescription')}}</label>
      <input class="form-control" type="text" id="postDescription" name="postDescription" v-model="model.postDescription" />
    </div>
    <div class="form-group">
      <label class="control-label" for="postImageId">{{$t('bll.favorites.PostImageId')}}</label>
      <input class="form-control" type="text" id="postImageId" name="postImageId" v-model="model.postImageId" />
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IFavoriteAdminDTO } from "@/types/IFavoriteDTO";

import { FavoritesApi } from "@/services/admin/FavoritesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";
import { requireError, isGuid } from "@/translations/validation";

@Component
export default class FavoritesEditA extends AdminEdit<IFavoriteAdminDTO> {
  onSubmit() {
    this.errors = [];

    if (!isGuid(this.model!.profileId)) {
      this.errors.push(requireError("bll.favorites.ProfileId"));
    }
    if (!isGuid(this.model!.postId)) {
      this.errors.push(requireError("bll.favorites.PostId"));
    }
    if (this.errors.length > 0) return;

    FavoritesApi.edit(this.Id, this.model!, this.jwt).then(
      (response: ResponseDTO) => {
        if (response?.errors) {
          this.errors = response.errors;
        } else {
          this.$router.go(-1);
        }
      }
    );
  }

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
