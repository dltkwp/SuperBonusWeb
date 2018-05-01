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

 import { DatePicker } from 'iview';
 import vLoading  from './components/loading/loading.vue'

 export default {
  name: 'App',
  components: {
    vLoading,
    DatePicker
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

  @import './assets/css/quill.core.css';
  @import './assets/css/quill.snow.css';
  @import './assets/css/quill.bubble.css';
  @import './assets/iview.css'
</style>
