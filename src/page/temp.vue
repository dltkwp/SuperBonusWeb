<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
        
      </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import vEmpty from "@/components/empty/empty.vue";
import {Page,DatePicker } from "iview";


import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util";


export default {
  components: {
   vMenus,
    vTop,
    vEmpty,
    DatePicker,
    Page
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
