<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IdentityStore from "@/components/shared/IdentityStore.vue";

import { RanksApi } from "@/services/RanksApi";
import router from "@/router";

import DetailsControls from "@/views/admin/components/shared/DetailsControls.vue";

import AdminDetailsWrapper from "../wrappers/AdminDetails.vue";

import MetaDetailsSection from "../MetaDetailsSection.vue";

@Component({
  components: {
    DetailsControls,
    AdminDetailsWrapper,
    MetaDetailsSection,
  },
})
export default class AdminDetails<TModel> extends IdentityStore {
  @Prop() protected id!: string;

  protected modelName?: string;
  protected model: TModel | null = null;

  get Id() {
    return this.id;
  }

  onEdit() {
    if (this.modelName && this.id) {
      router.push({
        name: `${this.modelName}sEditA`,
        params: { id: this.id },
      });
    }
  }

  onBackToList() {
    if (this.modelName) {
      router.push({ name: `${this.modelName}sIndexA` });
    }
  }
}
</script>
