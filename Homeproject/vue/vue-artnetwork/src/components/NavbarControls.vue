<template>
  <div>
    <a class="btn btn-primary fas fa-briefcase mr-2"></a>
    <a class="btn btn-primary fas fa-user-alt mr-2"></a>
    <a class="btn btn-primary fas fa-plus-square mr-2"></a>
    <a class="btn btn-primary fas fa-envelope"></a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";

@Component
export default class NavbarControls extends Vue {}
</script>
