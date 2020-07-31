<template>
  <div v-if="Id && model">
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
          <label class="control-label" for="ProfileId">Profile (ID)</label>
          <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="model.profileId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>
        <div class="form-group">
          <label class="control-label" for="CMrofileId">Room (ID)</label>
          <input class="form-control" type="text" required id="CMrofileId" name="CMrofileId" v-model="model.chatRoomId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="CMrofileId" data-valmsg-replace="true"></span>
        </div>
        <div class="form-group">
          <label class="control-label" for="CMrofileId">Role (ID)</label>
          <input class="form-control" type="text" required id="CMrofileId" name="CMrofileId" v-model="model.chatRoleId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="CMrofileId" data-valmsg-replace="true"></span>
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

import { IChatMemberAdminDTO } from "@/types/IChatMemberDTO";

import { ChatMembersApi } from "@/services/admin/ChatMembersApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component
export default class CMEditA extends Vue {
  @Prop()
  private id!: string;

  private model: IChatMemberAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  mounted() {
    ChatMembersApi.details(this.Id, this.jwt).then(
      (response: IChatMemberAdminDTO) => {
        this.model = response;
      }
    );
  }

  submit() {
    if (this.Id && this.model) {
      ChatMembersApi.edit(this.Id, this.model, this.jwt).then(
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
