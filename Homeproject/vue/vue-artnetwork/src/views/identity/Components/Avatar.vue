<template>
  <div>
    <h4 class>Avatar</h4>

    <div class="row d-flex flex-column align-items-center text-center mt-2">
      <div class="card" style="width: 20rem; user-select: none; position: relative;" draggable="false" id="image-miniature">
        <img
          src="/localstorage/\images\profiles\00000000-0000-0000-0000-000000000001\2434fbf7-d116-4f64-9da4-f64e15e8596d.jpg"
          alt
          class="card-img"
          id="render_image"
          draggable="false"
        />
        <div class="miniature-cover" style="width: 146.28px; height: 145.667px; margin: 70.9385px 79.6767px 220.643px 91.8971px;"></div>
        <div class="miniature-control" data-id="1" style="left: 91.8971px; top: 70.9385px;"></div>
        <div class="miniature-control" data-id="2" style="right: 79.6767px; top: 70.9385px;"></div>
        <div class="miniature-control" data-id="3" style="left: 91.8971px; bottom: 220.643px;"></div>
        <div class="miniature-control" data-id="4" style="right: 79.6767px; bottom: 220.643px;"></div>
      </div>

      <div class="col-md-8">
        <form method="post" enctype="multipart/form-data" novalidate="novalidate">
          <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
            <ul>
              <li style="display:none"></li>
            </ul>
          </div>

          <div class="custom-file">
            <input type="file" class="custom-file-input" lang="ru-RU" id="ImageFile" name="ImageFile" />
            <label class="custom-file-label" style="overflow: hidden"></label>
          </div>

          <div class="form-group mt-2">
            <button type="submit" class="btn btn-success">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";

@Component({
  components: {
    ImageComponent
  }
})
export default class Avatar extends Vue {
  get jwt() {
    return store.getters.getJwt;
  }
}
</script>
