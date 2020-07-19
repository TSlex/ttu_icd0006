<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import IdentityStore from "./IdentityStore.vue";

@Component
export default class ErrorListContainer extends IdentityStore {
  protected errors: string[] = [];

  protected errors1: string[] = [];
  protected errors2: string[] = [];
}
</script>
