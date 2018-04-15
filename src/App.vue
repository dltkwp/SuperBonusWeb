<template>
  <div id="app">
    <v-loading :isLoading="isLoading"></v-loading>
    <router-view/>
  </div>
</template>

<script>

 import "./lib/jquery-3.1.1.min.js"
 import "./lib/bootstrap.min.js"
 import "./lib/plugins/metisMenu/jquery.metisMenu.js"
 import "./lib/plugins/slimscroll/jquery.slimscroll.min.js"
 import "./lib/inspinia.js"
 import "./lib/plugins/pace/pace.min.js"

 import {mapGetters} from 'vuex'
 import * as types from './store/mutation-types'
 import * as components from './components'

 import vLoading  from './components/loading/loading.vue'

 import { DatePicker } from 'iview';
 
 export default {
  name: 'App',
  data() {
    return {
      userType:''
    }
  },
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
  @import "assets/css/bootstrap.min.css";
  @import "assets/font-awesome/css/font-awesome.css";
  @import "assets/css/animate.css";
  @import "assets/css/jasny-bootstrap.min.css";
  @import "assets/css/style.css";
</style>
