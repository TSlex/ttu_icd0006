<template>
  <AdminDetailsWrapper v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <div class="card" style="width: 40rem; user-select: none;" draggable="false" id="image-miniature">
      <ImageComponent :id="model.id" :key="model.id" htmlClass="card-img" height="inherit" width="inherit" />
    </div>
    <dl class="row">
      <dt class="col-sm-2">(ID)</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">URL</dt>
      <dd class="col-sm-10">{{model.imageUrl}}</dd>

      <dt class="col-sm-2">URL original</dt>
      <dd class="col-sm-10">{{model.originalImageUrl}}</dd>

      <dt class="col-sm-2">Height (PX)</dt>
      <dd class="col-sm-10">{{model.heightPx}}</dd>

      <dt class="col-sm-2">Width (PX)</dt>
      <dd class="col-sm-10">{{model.widthPx}}</dd>

      <dt class="col-sm-2">Padding top (PX)</dt>
      <dd class="col-sm-10">{{model.paddingTop}}</dd>

      <dt class="col-sm-2">Padding right (PX)</dt>
      <dd class="col-sm-10">{{model.paddingRight}}</dd>

      <dt class="col-sm-2">Padding bottom (PX)</dt>
      <dd class="col-sm-10">{{model.paddingBottom}}</dd>

      <dt class="col-sm-2">Padding left (PX)</dt>
      <dd class="col-sm-10">{{model.paddingLeft}}</dd>

      <dt class="col-sm-2">For (ID)</dt>
      <dd class="col-sm-10">{{model.imageFor}}</dd>

      <dt class="col-sm-2">Type</dt>
      <dd class="col-sm-10">{{model.imageType}}</dd>

      <dt class="col-sm-2">CreatedBy</dt>
      <dd class="col-sm-10">{{model.createdBy}}</dd>

      <dt class="col-sm-2">CreatedAt</dt>
      <dd class="col-sm-10">{{model.createdAt}}</dd>

      <dt class="col-sm-2">ChangedBy</dt>
      <dd class="col-sm-10">{{model.changedBy}}</dd>

      <dt class="col-sm-2">ChangedAt</dt>
      <dd class="col-sm-10">{{model.changedAt}}</dd>

      <dt class="col-sm-2">DeletedBy</dt>
      <dd class="col-sm-10">{{model.deletedBy}}</dd>

      <dt class="col-sm-2">DeletedAt</dt>
      <dd class="col-sm-10">{{model.deletedAt}}</dd>
    </dl>
  </AdminDetailsWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IImageAdminDTO } from "@/types/IImageDTO";

import { ImagesApi } from "@/services/admin/ImagesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ImagesDetailsA extends AdminDetails<IImageAdminDTO> {
  created() {
    this.modelName = "Image";
  }

  mounted() {
    ImagesApi.details(this.Id, this.jwt).then((response: IImageAdminDTO) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
