<template>
  <div id="default">
    <header>
      <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3 fixed-to">
        <div class="container">
          <router-link class="navbar-brand fa fa-palette" to="/">ArtNetwork</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <NavbarSearch />
          <NavbarControls />
          <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
            <Identity />
            <ul class="navbar-nav flex-grow-1"></ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <main role="main">
        <router-view v-cloak :key="$route.fullPath"></router-view>
      </main>
    </div>

    <footer class="border-top footer text-muted">
      <div class="container d-flex justify-content-center">
        <span>
          &copy; 2020 - ArtNetwork -
          <router-link to="/about">{{$t('views._layout.Privacy')}}</router-link>
        </span>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Identity from "@/components/navbar/Identity.vue";
import NavbarSearch from "@/components/navbar/NavbarSearch.vue";
import NavbarControls from "@/components/navbar/NavbarControls.vue";

@Component({
  components: {
    Identity,
    NavbarSearch,
    NavbarControls
  }
})
export default class DafaultArea extends Vue {}
</script>
