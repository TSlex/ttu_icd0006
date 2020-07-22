<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >{{cultureUI}}</a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a class="dropdown-item" @click="onSelectCulture(languageExtensions.en)">English</a>
      <a class="dropdown-item" @click="onSelectCulture(languageExtensions.et)">Eesti</a>
      <a class="dropdown-item" @click="onSelectCulture(languageExtensions.ru)">Русский</a>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LanguageExtensions } from "@/types/Enums/LanguageExtensions";
import store from "@/store";

@Component({ components: {} })
export default class LanguageSelection extends Vue {
  get languageExtensions() {
    return LanguageExtensions;
  }

  get culture() {
    return store.getters.getCurrentCulture;
  }

  get cultureUI() {
    switch (this.culture) {
      case "ru-RU":
        return "Русский";
      case "et-EE":
        return "Eesti";
      default:
        return "English";
    }
  }

  onSelectCulture(culture: LanguageExtensions) {
    store.commit("setCulture", culture);
  }
}
</script>

<style>
</style>
