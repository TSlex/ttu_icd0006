<template>
<div class="modal_back" @click="$emit('closeProfiles')"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";

import { IBlockedProfileDTO } from "@/types/IBlockedProfileDTO";
import { IFollowerDTO } from "@/types/IFollowerDTO";
import { IFavoriteDTO } from "@/types/IFavoriteDTO";

@Component
export default class ProfilesModal extends Vue {
  @Prop()
  private profilesData!: IBlockedProfileDTO | IFollowerDTO | IFavoriteDTO;
}
</script>
