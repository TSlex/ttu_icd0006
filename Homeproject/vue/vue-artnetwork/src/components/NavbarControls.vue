<template>
  <div>
    <!--<a class="btn btn-primary fas fa-briefcase mr-2"></a>-->
    <router-link v-if="isAuthenticated" class="btn btn-primary fas fa-user-alt mr-2" :to="userName"></router-link>
    <a class="btn btn-primary fas fa-plus-square mr-2"></a>
    <a class="btn btn-primary fas fa-envelope"></a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";
import JwtDecode from "jwt-decode";

@Component
export default class NavbarControls extends Vue {
  get isAuthenticated(): boolean {
    return store.getters.isAuthenticated;
  }

  get userName(): string {
    if (store.state.jwt) {
      const decoded = JwtDecode(store.state.jwt) as Record<string, string>;
      return decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];
    }
    return "";
  }
}
</script>
