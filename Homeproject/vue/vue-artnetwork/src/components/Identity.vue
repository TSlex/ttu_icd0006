<template>
  <ul class="navbar-nav">
    <template v-if="isAuthenticated">
      <li class="nav-item">
        <span class="nav-link text-dark">Hello, {{userName}}!</span>
      </li>
      <li class="nav-item">
        <div @click="logoutOnClick" class="nav-link text-dark" href>Logout</div>
      </li>
    </template>
    <template v-else>
      <li class="nav-item">
        <router-link to="/account/register" class="nav-link text-dark">Register</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/account/login" class="nav-link text-dark">Login</router-link>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";

@Component
export default class Identity extends Vue {
  get isAuthenticated(): boolean {
    return store.getters.isAuthenticated;
  }

  get userName(): string {
    return store.getters.getUserName;
  }

  logoutOnClick(): void {
    store.dispatch("clearJwt");
    router.push("/account/login");
  }
}
</script>
