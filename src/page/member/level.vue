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
                        <div class="btn btn-primary" @click="addLevel">新增等级</div>
                      </div>
                    </div>
                    <fieldset class="form-horizontal m-t-lg">

                      <div class="form-group" v-for="(item,index) in levelList" :key="index">
                        <label class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">
                              当顾客积分在
                              <input class="form-control inline mw-100 m-l-sm m-r-sm" disabled="" v-bind:value="item.start">至
                              <input class="form-control inline mw-100 m-l-sm m-r-sm" v-model="item.end" @change="endValChange(index)"  v-if="index < levelList.length - 1">
                              <input class="form-control inline mw-100 m-l-sm m-r-sm" disabled readonly   value="无穷大" v-if="index==levelList.length - 1">
                              之间，会员等级为
                              <input class="form-control inline mw-100 m-l-sm m-r-sm" v-model="item.name">
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" type="button" @click="levelSubmit">保存</button>
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
import superConst  from "../../util/super-const";
import regex from "../../util/regex";

export default {
  components: {
    vMenus,
    vTop,
    vFoot
  },
  data() {
    return {
      tabType: "Level",     // Level: 等级 Point：积分
      levelList: [],        // 等级的数据集合  {start:0,end:100,name:'VOP'}

    };
  },
  mounted() {
    let _this = this;
    _this.getLevelList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    endValChange: function (curIndex){
      let _this  = this;
      let cur = _this.levelList[curIndex];

      if(!regex.gtZeroNumer(cur.end) || cur.end < cur.start){
          cur.end = Number(cur.start) + Number(superConst.POINT_INTEVAL);
      }
      _this.$lodash.forEach(_this.levelList,function(item,index){
        if(index>curIndex){
          let pre = _this.levelList[index - 1];
          if(pre){
            item.start = pre.end;
            if(item.end < item.start){
              item.end = Number(item.start) + Number(superConst.POINT_INTEVAL);
            }
          }
        }
      })
    },
    tabChange: function(tabType) {
      let _this = this;
      _this.tabType = tabType;
    },
    getLevelList: function (){ // 如果没有自动加一条记录
      let _this = this;
      _this.levelList.push({start:0,end:superConst.POINT_INTEVAL,name:'VIP'});
    },
    addLevel:function (){
      let _this = this;
      let len = _this.levelList.length;
      if(len == 0){
        _this.levelList.push({start:0,end:superConst.POINT_INTEVAL,name:'VIP'});
      }else{
        let lastIndex = len - 1;
        let last = _this.levelList[lastIndex];
        last.end = Number(last.start + superConst.POINT_INTEVAL);

        let start = Number(last.end);
        let end = Number(last.end) + superConst.POINT_INTEVAL;

        _this.levelList.push({start: start,end: end,name:'VIP'});    
      }
    },
    removeLevel:function(index){
       let _this = this;
       _this.levelList.splice(index,1);
    },
    levelSubmit:function(){
      let _this = this; // 验证
      _this.$lodash.forEach(_this.levelList,function (item){
        console.log(item);
      });
    }
  }
};
</script>

<style>

</style>
