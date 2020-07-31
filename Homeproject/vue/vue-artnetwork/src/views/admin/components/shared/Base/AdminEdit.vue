<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ErrorListContainer from "@/components/shared/ErrorListContainer.vue";

import { RanksApi } from "@/services/RanksApi";

import AdminEditWrapper from "../wrappers/AdminEdit.vue";

@Component({
  components: {
    AdminEditWrapper,
  },
})
export default class AdminEdit extends ErrorListContainer {}
</script>
