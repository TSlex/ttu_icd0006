<template>
  <div class="404 d-flex flex-column align-items-center">
    <img alt="404" src="@/assets/404.png" width="500px" style="opacity: .8" />
    <span style="font-family: consolas, sans-serif; font-size: 1.5em">{{$t('views.common.Page404')}}</span>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  components: {},
};
</script>
