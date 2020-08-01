<template>
  <div>
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
        <button class="btn btn-primary" @click="downloadData">{{$t('views.common.DownloadButton')}}</button>
      </form>
      <p>
        <strong class="alert-danger">{{$t('views.identity.PersonalDataWarning3')}}</strong>
      </p>
      <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
        <ul>
          <li style="display:none"></li>
        </ul>
      </div>
      <form class="form-inline d-inline">
        <input type="password" :placeholder="$t('bll.profiles.Password')" class="form-control mt-2 mr-1" />
        <button class="btn btn-danger" type="button">{{$t('views.common.DeleteButton')}}</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";
import { AccountApi } from "@/services/AccountApi";
import { IProfileDataDTO } from "@/types/Identity/IProfileDataDTO";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ManageSecurity extends Vue {
  get jwt() {
    return store.getters.getJwt;
  }

  downloadData() {
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
}
</script>
