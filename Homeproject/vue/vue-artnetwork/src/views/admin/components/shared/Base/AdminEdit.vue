<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ErrorListContainer from "@/components/shared/ErrorListContainer.vue";

import { RanksApi } from "@/services/RanksApi";

import AdminEditWrapper from "../wrappers/AdminEdit.vue";
import router from "@/router";

@Component({
  components: {
    AdminEditWrapper,
  },
})
export default class AdminEdit<TModel> extends ErrorListContainer {
  protected model: TModel | null = null;
  protected modelName?: string;

  onBackToList() {
    if (this.modelName) {
      router.push({ name: `${this.modelName}sIndexA` });
    }
  }
}
</script>
