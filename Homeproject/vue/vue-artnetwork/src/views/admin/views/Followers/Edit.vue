<template>
  <div v-if="Id && Model">
    <h1 class="text-center">Edit</h1>
    <hr />
    <div class="row text-center justify-content-center">
      <div class="col-md-4">
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
          </ul>
        </div>

        <div class="form-group">
          <label class="control-label" for="FollowerId">Follower (ID)</label>
          <input class="form-control" type="text" required id="FollowerId" name="FollowerId" v-model="Model.followerProfileId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <i class="fa fa-arrow-down"></i>

        <div class="form-group">
          <label class="control-label" for="ProfileId">Profile (ID)</label>
          <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="Model.profileId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <button class="btn btn-success mr-1" @click="submit">Save</button>
          <button class="btn btn-secondary" @click="$router.go(-1)">Back to List</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IFollowerAdminDTO } from "@/types/IFollowerDTO";

import { FollowersApi } from "@/services/admin/FollowersApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component
export default class FollowersEditA extends Vue {
  @Prop()
  private id!: string;

  private Model: IFollowerAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  mounted() {
    FollowersApi.details(this.Id, this.jwt).then(
      (response: IFollowerAdminDTO) => {
        this.Model = response;
      }
    );
  }

  submit() {
    if (this.Id && this.Model) {
      FollowersApi.edit(this.Id, this.Model, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.$router.go(-1);
          }
        }
      );
    }
  }
}
</script>
