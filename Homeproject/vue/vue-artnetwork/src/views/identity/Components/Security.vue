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
      <form method="post" class="form-group" action="/identity/account/manage/downloadpersonaldata">
        <button class="btn btn-primary" type="submit">Download</button>
        <input
          name="__RequestVerificationToken"
          type="hidden"
          value="CfDJ8ImaPa_EwGJOqso6edmeSTTvC3bGPKFjFDLL9R94tv9eyFkEnQ6fM3ynaUg319Kv86_Wj7ZS_arDLbTDy6n29DiverLAP_a2yxcL7996F1C7C3lvKSsqdUQftYM-iCzpK478ui29gMtcKgKRBa8SY4QTaAsb1Tccce9LQfi97lo0lXH8wBqw5hvJ72-wNcGRLg"
        />
      </form>
      <p>
        <strong class="alert-danger">Deleting this data will permanently remove your account, and this cannot be recovered.</strong>
      </p>
      <form
        method="post"
        class="form-inline d-inline"
        action="/identity/account/manage/deletepersonaldata"
        novalidate="novalidate"
      >
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li style="display:none"></li>
          </ul>
        </div>
        <input
          type="password"
          placeholder="Password"
          class="form-control mt-2"
          data-val="true"
          data-val-required="The Password field is required."
          id="Input_Password"
          name="Input.Password"
        />
        <button class="btn btn-danger" type="submit">Delete</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";

@Component({
  components: {
    ImageComponent
  }
})
export default class ManageSecurity extends Vue {
  get jwt() {
    return store.getters.getJwt;
  }
}
</script>
