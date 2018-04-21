<template>
  <div id="app">
    <v-loading :isLoading="isLoading"></v-loading>
    <router-view/>
  </div>
</template>

<script>

 import "./assets/js/jquery-3.1.1.min.js"
 import "./assets/js/bootstrap.min.js"
 import "./assets/js/plugins/metisMenu/jquery.metisMenu.js"
 import "./assets/js/plugins/slimscroll/jquery.slimscroll.min.js"
 import "./assets/js/inspinia.js"
 import "./assets/js/plugins/pace/pace.min.js"

 import {mapGetters} from 'vuex'
 import * as types from './store/mutation-types'
 import * as components from './components'

 import vLoading  from './components/loading/loading.vue'

 export default {
  name: 'App',
  components: {
    vLoading
  },
  computed: {
    ...mapGetters({
      isLoading: [types.LOADING.IS_LOADING],
    })
  }
}
</script>
<style>
  @import "./assets/css/bootstrap.min.css";
  @import "./assets/font-awesome/css/font-awesome.css";
  @import "./assets/css/animate.css";
  @import "./assets/css/plugins/summernote/summernote-bs3.css";
  @import "./assets/css/plugins/summernote/summernote.css";

  @import "./assets/css/style.css";
  @import "./assets/css/custom.css";

</style>
