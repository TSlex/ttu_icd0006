<template>
  <div v-if="Id && Model">
    <h1>Details</h1>

    <div>
      <h4>Favorite</h4>
      <hr />
      <dl class="row">
        <dt class="col-sm-2">(ID)</dt>
        <dd class="col-sm-10">{{Model.id}}</dd>

        <dt class="col-sm-2">Profile (ID)</dt>
        <dd class="col-sm-10">{{Model.profileId}}</dd>

        <dt class="col-sm-2">Post (ID)</dt>
        <dd class="col-sm-10">{{Model.postId}}</dd>

        <dt class="col-sm-2">Post Title</dt>
        <dd class="col-sm-10">{{Model.postTitle}}</dd>

        <dt class="col-sm-2">Post Description)</dt>
        <dd class="col-sm-10">{{Model.postDescription}}</dd>

        <dt class="col-sm-2">Post Image (ID)</dt>
        <dd class="col-sm-10">{{Model.postImageId}}</dd>

        <dt class="col-sm-2">CreatedBy</dt>
        <dd class="col-sm-10">{{Model.createdBy}}</dd>

        <dt class="col-sm-2">CreatedAt</dt>
        <dd class="col-sm-10">{{Model.createdAt}}</dd>

        <dt class="col-sm-2">ChangedBy</dt>
        <dd class="col-sm-10">{{Model.changedBy}}</dd>

        <dt class="col-sm-2">ChangedAt</dt>
        <dd class="col-sm-10">{{Model.changedAt}}</dd>
      </dl>
    </div>
    <div>
      <button class="btn btn-primary mr-1" @click="onEdit(Model.id)">Edit</button>
      <button class="btn btn-primary" @click="$router.go(-1)">Back to List</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IFavoriteAdminDTO } from "@/types/IFavoriteDTO";

import { FavoritesApi } from "@/services/admin/FavoritesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component
export default class FavoritesDetailsA extends Vue {
  @Prop()
  private id!: string;

  private Model: IFavoriteAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  onEdit(id: string) {
    router.push({ name: "FavoritesEditA", params: { id } });
  }

  mounted() {
    FavoritesApi.details(this.Id, this.jwt).then(
      (response: IFavoriteAdminDTO) => {
        this.Model = response;
      }
    );
  }
}
</script>
