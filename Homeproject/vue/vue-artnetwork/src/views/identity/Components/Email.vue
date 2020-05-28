<template>
  <div>
    <h4>Change email</h4>

    <div class="row">
      <div class="col-md-6">
        <form id="email-form" method="post" novalidate="novalidate">
          <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
            <ul>
              <li style="display:none"></li>
            </ul>
          </div>
          <div class="form-group">
            <label for="Email">Current email</label>
            <div class="input-group">
              <input
                class="form-control"
                disabled
                type="text"
                data-val="true"
                data-val-required="The Current email field is required."
                id="Email"
                name="Email"
                value="admin@admin.com"
              />
              <div class="input-group-append">
                <span class="input-group-text text-success font-weight-bold">✓</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="Input_NewEmail">New email</label>
            <input
              class="form-control"
              type="email"
              data-val="true"
              data-val-email="The New email field is not a valid e-mail address."
              data-val-required="The New email field is required."
              id="Input_NewEmail"
              name="Input.NewEmail"
              value="admin@admin.com"
            />
            <span class="text-danger field-validation-valid" data-valmsg-for="Input.NewEmail" data-valmsg-replace="true"></span>
          </div>
          <button
            id="change-email-button"
            type="submit"
            class="btn btn-warning"
            formaction="/identity/account/manage/email?handler=ChangeEmail"
          >Save</button>
        </form>
      </div>
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
export default class ManageEmail extends Vue {
  get jwt() {
    return store.getters.getJwt;
  }
}
</script>
