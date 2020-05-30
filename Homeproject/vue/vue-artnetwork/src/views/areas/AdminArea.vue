<template>
  <div id="admin">
    <header>
      <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3 fixed-to">
        <div class="container">
          <a class="navbar-brand" asp-area="Admin" asp-controller="Home" asp-action="Index"><i class="fab fa-galactic-senate"></i>Admin panel</a>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Identity from "@/components/Identity.vue";
import NavbarSearch from "@/components/NavbarSearch.vue";
import NavbarControls from "@/views/admin/components/NavbarControls.vue";

@Component({
  components: {
    Identity,
    NavbarSearch,
    NavbarControls
  }
})
export default class AdminArea extends Vue {}
</script>

<style>

.bg-white{
    background-color: lightgray!important;
    font-family: Consolas, serif;
    font-weight: bold !important;
}

.nav-link{
    /*font-weight: bold !important;*/
    display: block !important;
    border: none;
}

a{
    color: #FF6633;
}

.btn-primary{
    background-color: #FF6633;
    border-color: #CC3300;
}

.btn-primary:hover{
    background-color: #CC3300;
    border-color: #CC3300;
}

.btn-primary:focus{
    outline-width: 3px !important;
    outline-color: #CC3300 !important;
}

</style>
