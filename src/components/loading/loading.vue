<template>
  <div class="loading-bg" v-if="isLoading">
        <div class="loading-bg"> 
            <rotate-square5 class="loading"></rotate-square5>
        </div>
  </div>
</template>


<script>
import { RotateSquare5 } from "vue-loading-spinner";
export default {
  components: {
    RotateSquare5
  },
  props: ["isLoading"]
};
</script>

<style scoped>
.loading-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 8888;
}
.loading {
  position: fixed;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  left: 50%;
  margin-left: -50px;
  top: 50%;
  margin-top: -50px;
  z-index: 9999;
}
</style>
