<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
        <div class="row">
          <div class="col-lg-12">
            <div class="tabs-container">
              <ul class="nav nav-tabs">
                <li v-bind:class="{active:tabType==='Level'}" @click="tabChange('Level')"><a href="javascript:;;"> 等级设置</a></li>
                <li v-bind:class="{active:tabType==='Point'}" @click="tabChange('Point')"><a href="javascript:;;"> 积分设置</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane"  v-bind:class="{active:tabType==='Level'}">
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="btn btn-primary" data-toggle="modal" href="#add-level">新增等级</div>
                      </div>
                    </div>
                    <fieldset class="form-horizontal m-t-lg">

                      <div class="form-group">
                        <label class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">

                                当顾客积分在<input class="form-control inline mw-100 m-l-sm m-r-sm" disabled="" value="0">至<input class="form-control inline mw-100 m-l-sm m-r-sm" value="10">之间，会员等级为<input class="form-control inline mw-100 m-l-sm m-r-sm" value="散客">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">
                                当顾客积分在<input class="form-control inline mw-100 m-l-sm m-r-sm" disabled="" value="10">至<input class="form-control inline mw-100 m-l-sm m-r-sm" value="100">之间，会员等级为<input class="form-control inline mw-100 m-l-sm m-r-sm" value="威客">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">
                                当顾客积分在<input class="form-control inline mw-100 m-l-sm m-r-sm" disabled="" value="100">至<input class="form-control inline mw-100 m-l-sm m-r-sm" value="10000">之间，会员等级为<input class="form-control inline mw-100 m-l-sm m-r-sm" value="大威威客">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">
                                当顾客积分在<input class="form-control inline mw-100 m-l-sm m-r-sm" disabled="" value="10000">至<input class="form-control inline mw-100 m-l-sm m-r-sm" value="100000">之间，会员等级为<input class="form-control inline mw-100 m-l-sm m-r-sm" value="超级威客"><a href="#"><i class="fa fa-times-circle text-danger font-xxlg"></i> </a>
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" type="submit">保存</button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="tab-pane"  v-bind:class="{active:tabType==='Point'}">
                  <div class="panel-body" >
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label class="col-lg-3 control-label">积分设置</label>
                        <div class="col-lg-8">
                            <input class="form-control inline mw-100 m-l-sm m-r-sm" value="1">元 = <input class="form-control inline mw-100 m-l-sm m-r-sm" value="1">积分
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" type="submit">保存</button>
                        </div>
                      </div>
                    </form>
                  </div>
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
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import vFoot from "@/components/foot/foot.vue";

export default {
  components: {
    vMenus,
    vTop,
    vFoot
  },
  data() {
    return {
      tabType: "Level",     // Level: 等级 Point：积分
      levelList: [],        // 等级的数据集合

    };
  },
  mounted() {},
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    tabChange: function(tabType) {
      let _this = this;
      _this.tabType = tabType;
    },
    getLevelList: function (){

    },
    addLevel:function (){},
    removeLevel:function(){},
    levelSubmit:function(){}
  }
};
</script>

<style>

</style>
