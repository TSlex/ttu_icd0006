<template>
  <div>
    <slot></slot>
    <router-link class="btn btn-primary fas fa-home mr-2" to="/"></router-link>
    <router-link class="btn btn-primary fas fa-briefcase mr-2" to="/admin/panel"></router-link>
    <router-link class="btn btn-primary fas fa-user-alt mr-2" :to="'/profiles/' + userName"></router-link>
    <router-link class="btn btn-primary fas fa-envelope mr-2" to="/messages"></router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import IdentityStore from "@/components/shared/IdentityStore.vue";

@Component
export default class NavbarControls extends IdentityStore {}
</script>
