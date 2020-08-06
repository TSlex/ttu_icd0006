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
  @Prop() protected id!: string;

  protected model: TModel | null = null;
  protected modelName?: string;

  get Id() {
    return this.id;
  }

  onBackToList() {
    if (this.modelName) {
      router.replace({ name: `${this.modelName}sIndexA` });
    }
  }
}
</script>
