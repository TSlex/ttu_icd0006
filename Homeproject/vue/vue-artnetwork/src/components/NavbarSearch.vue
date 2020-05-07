<template>
  <form class="form-inline navbar-collapse collapse d-sm-inline-flex flex-sm-row" method="post" action="">
    <input class="form-control mr-sm-2" type="search" placeholder="username" name="username">
    <button class="btn btn-primary fas fa-search" type="button"></button>
  </form>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";

@Component
export default class NavbarSearch extends Vue {

}
</script>
