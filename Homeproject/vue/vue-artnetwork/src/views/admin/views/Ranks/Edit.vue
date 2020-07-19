<template>
  <AdminEdit v-if="id && Model" v-on:onSubmit="onSubmit">
    <FormInput id="rankId" label="Title" :model="Model.id" v-on:onChange="(value) => {Model.id = value}" />
    <CreateEdit :model="Model" />
  </AdminEdit>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IRankAdminDTO } from "@/types/IRankDTO";
import { IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ImagesApi } from "@/services/ImagesApi";
import { ImageType } from "@/types/Enums/ImageType";

import AdminEdit from "@/views/admin/components/shared/AdminEdit.vue";
import FormInput from "@/components/shared/FormInput.vue";

import CreateEdit from "./CreateEdit.vue";

@Component({
  components: {
    FormInput,
    AdminEdit,
    CreateEdit
  }
})
export default class RanksEditA extends AdminEdit {
  @Prop() id!: string;

  private Model: IRankAdminDTO | null = null;

  beforeMount() {
    RanksApi.details(this.id, this.jwt).then((response: IRankAdminDTO) => {
      this.Model = response;
    });
  }

  onSubmit() {
    if (this.id && this.Model) {
      RanksApi.edit(this.id, this.Model, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
            console.log(this.errors);
          } else {
            this.$router.go(-1);
          }
        }
      );
    }
  }
}
</script>
