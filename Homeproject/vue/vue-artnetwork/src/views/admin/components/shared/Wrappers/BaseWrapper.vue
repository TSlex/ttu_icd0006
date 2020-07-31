<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BaseWrapper extends Vue {
  @Prop({ default: false }) ignoreTopColStyle!: boolean;
}
</script>
