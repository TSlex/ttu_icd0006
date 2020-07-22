<template>
  <ul class="navbar-nav">
    <template v-if="isAuthenticated">
      <li class="nav-item">
        <router-link to="/account/manage" class="nav-link text-dark">Hello, {{userName}}!</router-link>
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
    <LanguageSelection />
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IdentityStore from "@/components/shared/IdentityStore.vue";

import LanguageSelection from "@/components/navbar/LanguageSelection.vue";

import store from "@/store";
import router from "@/router";

@Component({
  components: {
    LanguageSelection
  }
})
export default class Identity extends IdentityStore {
  logoutOnClick(): void {
    store.dispatch("clearJwt");
    router.push("/account/login");
  }
}
</script>
