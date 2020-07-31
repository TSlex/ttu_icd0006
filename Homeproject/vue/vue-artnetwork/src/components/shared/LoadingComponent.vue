<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import LoadingOverlay from "@/components/LoadingOverlay.vue";
import IdentityStore from "./IdentityStore.vue";

@Component({
  components: {
    LoadingOverlay,
  },
})
export default class LoadingComponent extends Vue {
  protected isLoaded = false;
}
</script>
