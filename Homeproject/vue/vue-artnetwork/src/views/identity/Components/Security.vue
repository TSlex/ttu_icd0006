<template>
  <div>
    <h4>Privacy and Security</h4>
    <hr />

    <h5 class="mt-3">Personal Data</h5>

    <div class>
      <span>
        Your account contains personal data that you have given us.
        <br />This page allows you to download or delete that data.
      </span>
      <form class="form-group">
        <button class="btn btn-primary" @click="downloadData">Download</button>
      </form>
      <p>
        <strong class="alert-danger">Deleting this data will permanently remove your account, and this cannot be recovered.</strong>
      </p>
      <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
        <ul>
          <li style="display:none"></li>
        </ul>
      </div>
      <form class="form-inline d-inline">
        <input type="password" placeholder="Password" class="form-control mt-2 mr-1" />
        <button class="btn btn-danger" type="button">Delete</button>
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
    ImageComponent
  }
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
          encodeURIComponent(JSON.stringify(response, null, ' '));
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
