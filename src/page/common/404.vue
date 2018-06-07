<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
        <div class="wrapper wrapper-content ">
           <div class="row">
            <div class="col-lg-12">
             <div class="ibox">
              <div class="ibox-title">温馨提示：</div>
              <div class="ibox-content">
                <div class="table-responsive">
                    你访问的页面走丢了，去看看其他页面吧！！！
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
   </div>
</template>

<script>

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";

export default {
  components: {
    vMenus,
    vTop
  },
  data() {
    return {
     
    };
  },
  mounted() {
   
  },
  methods: {
    
  }
};
</script>

<style>

</style>
