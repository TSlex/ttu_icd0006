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
        <div class="miniature-cover" style="width: 0; height: 0px; margin: 0px 0px 0px 0px;"></div>
        <div class="miniature-control" data-id="1" style="left: 0; top: 0;"></div>
        <div class="miniature-control" data-id="2" style="right: 0; top: 0"></div>
        <div class="miniature-control" data-id="3" style="left: 0; bottom: 0;"></div>
        <div class="miniature-control" data-id="4" style="right: 0; bottom: 0;"></div>
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

          <input
            type="hidden"
            data-val="true"
            data-val-range="The field HeightPx must be between 0 and 10000."
            data-val-range-max="10000"
            data-val-range-min="0"
            data-val-required="The HeightPx field is required."
            id="HeightPx"
            name="HeightPx"
            value="183"
          />
          <input
            type="hidden"
            data-val="true"
            data-val-range="The field WidthPx must be between 0 and 10000."
            data-val-range-max="10000"
            data-val-range-min="0"
            data-val-required="The WidthPx field is required."
            id="WidthPx"
            name="WidthPx"
            value="276"
          />
          <input
            type="hidden"
            data-val="true"
            data-val-required="The PaddingTop field is required."
            id="PaddingTop"
            name="PaddingTop"
            value="31"
          />
          <input
            type="hidden"
            data-val="true"
            data-val-required="The PaddingRight field is required."
            id="PaddingRight"
            name="PaddingRight"
            value="71"
          />
          <input
            type="hidden"
            data-val="true"
            data-val-required="The PaddingBottom field is required."
            id="PaddingBottom"
            name="PaddingBottom"
            value="49"
          />
          <input
            type="hidden"
            data-val="true"
            data-val-required="The PaddingLeft field is required."
            id="PaddingLeft"
            name="PaddingLeft"
            value="101"
          />

          <input
            type="hidden"
            data-val="true"
            data-val-maxlength="The field OriginalImageUrl must be a string or array type with a maximum length of '300'."
            data-val-maxlength-max="300"
            id="OriginalImageUrl"
            name="OriginalImageUrl"
            value="\images\profiles\00000000-0000-0000-0000-000000000001\79062093-abba-4d50-a1a8-e80711e5ac54.jpg"
          />

          <div class="form-group mt-2">
            <button type="submit" class="btn btn-success">Save</button>
          </div>
          <input
            name="__RequestVerificationToken"
            type="hidden"
            value="CfDJ8ImaPa_EwGJOqso6edmeSTTyzgqBELJ4ZorGfzXdQQYArFb2KsRPkI1VQ8zbD8LEAj7FWcrhe22wzOSmIQtt3hCAJbhdUoKGbY_oEv29CX2dTlWmCq6jRrRrq72Geki6OYlbk8WRpELlA7eCUFQatjSvhO7WBYqDdDPs4LUfUmzHVnxk5Dg5lsEvBn_Pqmw-dw"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
// import { init } from "../../../static/js/image-miniature.js";
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

  Init() {
    // init();
  }

  mounted() {
    let exist = document.getElementById("image_miniature_script");

    console.log(exist);

    if (exist) {
      document.body.remove(exist);
    }

    console.log(exist);

    let script = document.createElement("script");
    script.setAttribute("id", "image_miniature_script");
    script.setAttribute("src", "image-miniature.js");
    script.setAttribute("defer", "defer");
    document.body.appendChild(script);
  }
}
</script>
