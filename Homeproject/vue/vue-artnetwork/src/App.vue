<template>
  <div id="app" :key="isAdminPanel">
    <AdminArea v-if="isAdminPanel" />
    <DafaultArea v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DafaultArea from "@/views/areas/DefaultArea.vue";
import AdminArea from "@/views/areas/AdminArea.vue";
import IdentityStore from "./components/shared/IdentityStore.vue";

@Component({
  components: {
    DafaultArea,
    AdminArea,
  },
})
export default class App extends IdentityStore {
  get isAdminPanel() {
    return this.$route.path.indexOf("admin") === 1 && this.isAdmin;
  }
}
</script>
