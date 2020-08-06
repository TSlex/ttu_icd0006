<template>
  <AdminEditWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="profileId">{{$t('bll.blockedprofiles.ProfileId')}}*</label>
      <input class="form-control" type="text" required id="profileId" name="profileId" v-model="model.profileId" />
    </div>
    <i class="fa fa-arrow-down"></i>
    <div class="form-group">
      <label class="control-label" for="bProfileId">{{$t('bll.blockedprofiles.BProfileId')}}*</label>
      <input class="form-control" type="text" required id="bProfileId" name="bProfileId" v-model="model.bProfileId" />
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IBlockedProfileAdminDTO } from "@/types/IBlockedProfileDTO";

import { BlockedProfilesApi } from "@/services/admin/BlockedProfilesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";
import { requireError, isGuid } from "@/translations/validation";

@Component
export default class BPEditA extends AdminEdit<IBlockedProfileAdminDTO> {
  mounted() {
    BlockedProfilesApi.details(this.Id, this.jwt).then(
      (response: IBlockedProfileAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }

  created() {
    this.modelName = "BlockedProfile";
  }

  onSubmit() {
    this.errors = [];

    if (!isGuid(this.model!.profileId)) {
      this.errors.push(requireError("bll.blockedprofiles.ProfileId"));
    }
    if (!isGuid(this.model!.bProfileId)) {
      this.errors.push(requireError("bll.blockedprofiles.BProfileId"));
    }
    if (this.errors.length > 0) return;

    BlockedProfilesApi.edit(this.Id, this.model!, this.jwt).then(
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
</script>
