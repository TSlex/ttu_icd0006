<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import IdentityStore from "./IdentityStore.vue";
import ErrorsList from "@/components/shared/ErrorsList.vue";

@Component({
  components: {
    ErrorsList,
  },
})
export default class ErrorListContainer extends IdentityStore {
  public errors: string[] = [];

  public errors1: string[] = [];
  public errors2: string[] = [];
}
</script>
