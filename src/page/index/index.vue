<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
           <div class="row">
                <div class="col-lg-12">
                    <div class="text-center m-t-lg">
                        <h1>
                            超级悬赏管理平台（后续统计位置显示区域）
                        </h1>
                        <small>
                        </small>
                    </div>
                </div>
            </div>
      </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import superConst from "../../util/super-const";
import regex from "../../util/regex";

export default {
  components: {
    vMenus,
    vTop
  },
  data() {
    return {};
  },
  mounted() {
    let _this = this;
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING])
  }
};
</script>

<style>

</style>
