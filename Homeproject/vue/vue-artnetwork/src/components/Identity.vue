<template>
  <ul class="navbar-nav">
    <template v-if="isAuthenticated">
      <li class="nav-item">
        <span class="nav-link text-dark">Hello, {{userName}}!</span>
      </li>
      <li class="nav-item">
        <a @click="logoutOnClick" class="nav-link text-dark" href>Logout</a>
      </li>
    </template>
    <template v-else>
      <li class="nav-item">
        <router-link to="/account/login" class="nav-link text-dark">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/account/register" class="nav-link text-dark">Register</router-link>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";
import JwtDecode from "jwt-decode";

@Component
export default class Identity extends Vue {
  get isAuthenticated(): boolean {
    return store.getters.isAuthenticated;
  }

  get userId(): string {
    if (store.state.jwt) {
      const decoded = JwtDecode(store.state.jwt) as Record<string, string>;
      return decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    }
    return "null";
  }

  get userName(): string {
    if (store.state.jwt) {
      const decoded = JwtDecode(store.state.jwt) as Record<string, string>;
      return decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];
    }
    return "null";
  }

  get userRoles(): string {
    if (store.state.jwt) {
      const decoded = JwtDecode(store.state.jwt) as Record<string, string>;
      return decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    }
    return "null";
  }

  logoutOnClick(): void {
    store.dispatch("clearJwt");
    router.push("/");
  }
}
</script>
