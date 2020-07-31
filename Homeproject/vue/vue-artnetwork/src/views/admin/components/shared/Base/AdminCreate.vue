<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ErrorListContainer from "@/components/shared/ErrorListContainer.vue";

import { RanksApi } from "@/services/RanksApi";

import AdminCreateWrapper from "../wrappers/AdminCreate.vue";
import router from "@/router";

@Component({
  components: {
    AdminCreateWrapper,
  },
})
export default class AdminCreate extends ErrorListContainer {
  protected modelName?: string;

  onBackToList() {
    if (this.modelName) {
      router.push({ name: `${this.modelName}sIndexA` });
    }
  }
}
</script>
