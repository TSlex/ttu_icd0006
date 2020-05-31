<template>
  <div v-if="Id && Model">
    <h1>Details</h1>

    <div>
      <h4>Image</h4>
      <hr />
      <div class="card" style="width: 40rem; user-select: none;" draggable="false" id="image-miniature">
        <ImageComponent :id="Model.id" :key="Model.id" htmlClass="card-img" height="inherit" width="inherit" />
      </div>
      <dl class="row">
        <dt class="col-sm-2">(ID)</dt>
        <dd class="col-sm-10">{{Model.id}}</dd>

        <dt class="col-sm-2">URL</dt>
        <dd class="col-sm-10">{{Model.imageUrl}}</dd>

        <dt class="col-sm-2">URL original</dt>
        <dd class="col-sm-10">{{Model.originalImageUrl}}</dd>

        <dt class="col-sm-2">Height (PX)</dt>
        <dd class="col-sm-10">{{Model.heightPx}}</dd>

        <dt class="col-sm-2">Width (PX)</dt>
        <dd class="col-sm-10">{{Model.widthPx}}</dd>

        <dt class="col-sm-2">Padding top (PX)</dt>
        <dd class="col-sm-10">{{Model.paddingTop}}</dd>

        <dt class="col-sm-2">Padding right (PX)</dt>
        <dd class="col-sm-10">{{Model.paddingRight}}</dd>

        <dt class="col-sm-2">Padding bottom (PX)</dt>
        <dd class="col-sm-10">{{Model.paddingBottom}}</dd>

        <dt class="col-sm-2">Padding left (PX)</dt>
        <dd class="col-sm-10">{{Model.paddingLeft}}</dd>

        <dt class="col-sm-2">For (ID)</dt>
        <dd class="col-sm-10">{{Model.imageFor}}</dd>

        <dt class="col-sm-2">Type</dt>
        <dd class="col-sm-10">{{Model.imageType}}</dd>

        <dt class="col-sm-2">CreatedBy</dt>
        <dd class="col-sm-10">{{Model.createdBy}}</dd>

        <dt class="col-sm-2">CreatedAt</dt>
        <dd class="col-sm-10">{{Model.createdAt}}</dd>

        <dt class="col-sm-2">ChangedBy</dt>
        <dd class="col-sm-10">{{Model.changedBy}}</dd>

        <dt class="col-sm-2">ChangedAt</dt>
        <dd class="col-sm-10">{{Model.changedAt}}</dd>

        <dt class="col-sm-2">DeletedBy</dt>
        <dd class="col-sm-10">{{Model.deletedBy}}</dd>

        <dt class="col-sm-2">DeletedAt</dt>
        <dd class="col-sm-10">{{Model.deletedAt}}</dd>
      </dl>
    </div>
    <div>
      <button class="btn btn-primary mr-1" @click="onEdit(Model.id)">Edit</button>
      <button class="btn btn-primary" @click="$router.go(-1)">Back to List</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IImageAdminDTO } from "@/types/IImageDTO";

import { ImagesApi } from "@/services/admin/ImagesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent
  }
})
export default class ImagesDetailsA extends Vue {
  @Prop()
  private id!: string;

  private Model: IImageAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  onEdit(id: string) {
    router.push({ name: "ImagesEditA", params: { id } });
  }

  mounted() {
    ImagesApi.details(this.Id, this.jwt).then((response: IImageAdminDTO) => {
      this.Model = response;
    });
  }
}
</script>
