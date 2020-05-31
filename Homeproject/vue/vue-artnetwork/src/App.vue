<template>
  <div id="app">
    <AdminArea v-if="$route.path.indexOf('admin') === 1" />
    <DafaultArea v-else/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DafaultArea from "@/views/areas/DefaultArea.vue";
import AdminArea from "@/views/areas/AdminArea.vue";

@Component({
  components: {
    DafaultArea,
    AdminArea
  }
})
export default class App extends Vue {
}
</script>
