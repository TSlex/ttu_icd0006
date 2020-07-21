
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

@Component({
  components: {}
})
export default class ProfileContainer extends Vue {
  get isCurrentUser(): boolean {
    return store.getters.getUserName === store.state.profile?.userName;
  }
}
</script>

<style>
</style>
