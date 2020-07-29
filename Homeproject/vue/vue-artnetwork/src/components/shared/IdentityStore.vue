
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

@Component({})
export default class IdentityStore extends Vue {
  protected get isAuthenticated(): boolean {
    return store.getters.isAuthenticated;
  }

  protected get isAdmin(): boolean {
    return store.getters.isAdmin;
  }

  protected get userName(): string {
    return store.getters.getUserName;
  }

  protected get jwt() {
    return store.getters.getJwt;
  }
}
</script>
