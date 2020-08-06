<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IdentityStore from "@/components/shared/IdentityStore.vue";

import AdminIndexWrapper from "../wrappers/AdminIndex.vue";

import { RanksApi } from "@/services/RanksApi";

import router from "@/router";

@Component({
  components: {
    AdminIndexWrapper,
  },
})
export default class AdminIndex<TModel> extends IdentityStore {
  protected historyId?: string;
  protected modelName?: string;
  protected model: TModel[] = [];

  get ModelName() {
    return this.modelName ?? null;
  }

  onCreate() {
    if (this.ModelName) {
      router.replace({ name: `${this.ModelName}sCreateA` });
    }
  }

  onEdit(id: string) {
    if (this.ModelName) {
      router.replace({ name: `${this.ModelName}sEditA`, params: { id } });
    }
  }

  onDetails(id: string) {
    if (this.ModelName) {
      router.replace({ name: `${this.ModelName}sDetailsA`, params: { id } });
    }
  }
}
</script>
