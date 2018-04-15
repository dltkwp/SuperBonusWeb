<template>
  <div class="empty" v-if="isShow">
        <div class="img"></div>
    <div class="empty-info font-grey-salt">暂无数据</div>
</div>
</template>

<script>
export default {
  components: {
  },
  props: ["isShow"]
};
</script>

<style>
</style>
