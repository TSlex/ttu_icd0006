<template>
  <div v-if="isLoaded">
    <h4>{{$t('views.identity.PrivacyHeader')}}</h4>
    <hr />

    <h5 class="mt-3">{{$t('views.identity.PersonalDataHeader')}}</h5>

    <div class>
      <span>
        {{$t('views.identity.PersonalDataWarning1')}}
        <br />
        {{$t('views.identity.PersonalDataWarning2')}}
      </span>
      <form class="form-group">
        <button class="btn btn-primary" @click="onDownloadData">{{$t('views.common.DownloadButton')}}</button>
      </form>
      <p>
        <strong class="alert-danger">{{$t('views.identity.PersonalDataWarning3')}}</strong>
      </p>
      <ErrorsList :errors="errors" />

      <form class="form-inline d-inline">
        <input
          type="password"
          :placeholder="$t('bll.profiles.Password')"
          class="form-control mt-2 mr-1"
          v-model="deleteModel.password"
        />
        <button class="btn btn-danger" @click="onDeleteProfile">{{$t('views.common.DeleteButton')}}</button>
      </form>
    </div>
  </div>
  <LoadingOverlay v-else :fixed="false" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";
import { AccountApi } from "@/services/AccountApi";
import { IProfileDataDTO } from "@/types/Identity/IProfileDataDTO";
import IdentityStore from "../../../components/shared/IdentityStore.vue";
import ErrorListContainer from "../../../components/shared/ErrorListContainer.vue";
import { IDeleteDTO } from "../../../types/Identity/IDeleteDTO";
import { ResponseDTO } from "../../../types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ManageSecurity extends ErrorListContainer {
  private deleteModel: IDeleteDTO = {
    password: "",
  };

  onDownloadData(e: Event) {
    e.preventDefault();

    AccountApi.getProfileData(this.jwt).then(
      (response: IProfileDataDTO | null) => {
        let dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(response, null, " "));

        let downloadAnchorNode = document.createElement("a");

        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "personal.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }
    );
  }

  onDeleteProfile(e: Event) {
    e.preventDefault();

    store
      .dispatch("deleteProfile", this.deleteModel)
      .then((response: ResponseDTO) => {
        if (response.errors?.length > 0) {
          this.errors = response.errors;
        } else {
          this.$router.replace("/");
        }
      });
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
