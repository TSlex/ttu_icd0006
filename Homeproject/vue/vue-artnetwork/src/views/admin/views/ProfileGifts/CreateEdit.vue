<template>
  <div>
    <div class="form-group mt-3">
      <label class="control-label" for="profileId">{{$t('bll.profilegifts.ProfileId')}}*</label>
      <input class="form-control" type="text" required id="profileId" name="profileId" v-model="model.profileId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="giftId">{{$t('bll.profilegifts.GiftId')}}*</label>
      <input class="form-control" type="text" required id="giftId" name="giftId" v-model="model.giftId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="fromProfileId">{{$t('bll.profilegifts.FromProfileId')}}</label>
      <input class="form-control" type="text" id="fromProfileId" name="fromProfileId" v-model="model.fromProfileId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="message">{{$t('bll.profilegifts.Message')}}</label>
      <textarea rows="3" class="form-control" type="text" id="message" name="message" v-model="model.message"></textarea>
    </div>

    <div class="form-group">
      <label class="control-label" for="price">{{$t('bll.profilegifts.Price')}}</label>
      <input class="form-control" type="text" id="price" name="price" v-model.number="model.price" />
    </div>

    <div class="form-group">
      <label class="control-label" for="giftDateTime">{{$t('bll.profilegifts.GiftDateTime')}}*</label>
      <FlatpickrInput :value="model.giftDateTime" :onChange="(value) => model.giftDateTime = value" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IProfileGiftAdminDTO } from "@/types/IProfileGiftDTO";

import FlatpickrInput from "@/components/shared/FlatpickrInput.vue";

@Component({
  components: {
    FlatpickrInput,
  },
})
export default class CreateEdit extends Vue {
  @Prop() model!: IProfileGiftAdminDTO;
}
</script>

<style>
</style>
