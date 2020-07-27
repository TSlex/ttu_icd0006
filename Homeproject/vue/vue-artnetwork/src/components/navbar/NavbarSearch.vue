<template>
  <form class="form-inline navbar-collapse collapse d-sm-inline-flex flex-sm-row" style="margin: unset">
    <input
      class="form-control mr-sm-2"
      type="search"
      :placeholder="$t('views._layout.SearchBarPlaceHolder')"
      name="username"
      v-model="userName"
    />
    <button class="btn btn-primary fas fa-search" @click="search"></button>
  </form>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";
import { ProfilesApi } from "../../services/ProfilesApi";

import { routeIfCan } from "@/helpers/route";

@Component
export default class NavbarSearch extends Vue {
  private userName: string = "";

  private search(e: Event) {
    if (this.userName.length > 0) {
      ProfilesApi.exists(this.userName).then((response: boolean) => {
        if (response) {
          // router.push("/profiles/" + this.userName).catch((err) => {});
          routeIfCan("/profiles/" + this.userName);
        } else {
          // router.push("/404").catch((err) => {});
          routeIfCan("/404");
        }

        this.userName = "";
      });
    }

    e.preventDefault();
  }
}
</script>
