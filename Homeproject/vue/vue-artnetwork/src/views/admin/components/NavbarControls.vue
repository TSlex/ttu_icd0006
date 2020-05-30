<template>
  <div>
    <slot></slot>
      <a class="btn btn-primary fas fa-home  mr-2"></a>
      <a class="btn btn-primary fas fa-briefcase  mr-2"></a>
      <a class="btn btn-primary fas fa-user-alt mr-2"></a>
      <a class="btn btn-primary fas fa-envelope mr-2"></a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

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
