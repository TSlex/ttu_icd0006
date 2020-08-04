
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import { IProfileDTO } from "@/types/IProfileDTO";
import IdentityStore from "./IdentityStore.vue";

@Component({
  components: {},
})
export default class ProfileContainer extends IdentityStore {
  get profile(): IProfileDTO | null {
    return store.state.profile!;
  }

  get username(): string | null {
    return this.profile?.userName ?? null;
  }

  get isCurrentUser(): boolean {
    return (
      store.getters.isAuthenticated &&
      store.getters.getUserName === store.state.profile?.userName
    );
  }
}
</script>

<style>
</style>
