<template>
  <div>
    <template v-if="isAuthenticated">
      <router-link class="btn btn-primary fas fa-user-alt mr-2" :to="'/profiles/' + userName"></router-link>
      <router-link class="btn btn-primary fas fa-plus-square mr-2" to="/posts/create"></router-link>
      <router-link class="btn btn-primary fas fa-envelope" to="/messages"></router-link>
    </template>
    <template v-else>
      <router-link class="btn btn-primary fas fa-user-alt mr-2" to="/account/login"></router-link>
      <router-link class="btn btn-primary fas fa-plus-square mr-2" to="/account/login"></router-link>
      <router-link class="btn btn-primary fas fa-envelope" to="/account/login"></router-link>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";

@Component
export default class NavbarControls extends Vue {
  get isAuthenticated(): boolean {
    return store.getters.isAuthenticated;
  }

  get userName(): string {
    return store.getters.getUserName;
  }
}
</script>
