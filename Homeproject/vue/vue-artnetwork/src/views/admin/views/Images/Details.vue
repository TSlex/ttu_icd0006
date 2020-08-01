<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <div class="card" style="width: 20rem;">
      <ImageComponent :id="model.id" :key="model.id" htmlClass="card-img" height="inherit" width="inherit" />
    </div>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.ImageUrl')}}</dt>
      <dd class="col-sm-10">{{model.imageUrl}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.OriginalImageUrl')}}</dt>
      <dd class="col-sm-10">{{model.originalImageUrl}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.HeightPx')}}</dt>
      <dd class="col-sm-10">{{model.heightPx}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.WidthPx')}}</dt>
      <dd class="col-sm-10">{{model.widthPx}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.PaddingTop')}}</dt>
      <dd class="col-sm-10">{{model.paddingTop}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.PaddingRight')}}</dt>
      <dd class="col-sm-10">{{model.paddingRight}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.PaddingBottom')}}</dt>
      <dd class="col-sm-10">{{model.paddingBottom}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.PaddingLeft')}}</dt>
      <dd class="col-sm-10">{{model.paddingLeft}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.images.ImageFor')}}</dt>
      <dd class="col-sm-10">{{model.imageFor}}</dd>

      <dt class="col-sm-2">{{$t('bll.images.ImageType')}}</dt>
      <dd class="col-sm-10">{{resolveType(model.imageType)}}</dd>
    </dl>
    <hr />
    <MetaDetailsSection :model="model" />
  </AdminDetailsWrapper>
  <LoadingOverlay v-else />
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

import { resolveType } from "@/translations/imageType";
import { ImageType } from "@/types/Enums/ImageType";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ImagesDetailsA extends AdminDetails<IImageAdminDTO> {
  resolveType(type: ImageType) {
    return resolveType(type);
  }

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
