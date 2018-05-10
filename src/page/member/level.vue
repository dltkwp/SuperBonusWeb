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
                              <input class="form-control inline mw-100 m-l-sm m-r-sm" disabled="" v-bind:value="item.startPoint" maxlength="7">至
                              <input class="form-control inline mw-100 m-l-sm m-r-sm" v-model="item.endPoint" @change="endValChange(index)"  v-if="index < levelList.length - 1"  maxlength="8">
                              <input class="form-control inline mw-100 m-l-sm m-r-sm" disabled readonly   value="无穷大" v-if="index==levelList.length - 1">
                              之间，会员等级为
                              <input class="form-control inline mw-100 m-l-sm m-r-sm" v-model="item.name">
                              <a href="javascript:;;" @click="removeLevel(index)"  v-if="index==levelList.length-1 && index>0"><i class="fa fa-times-circle text-danger font-xxlg"></i> </a>
                        </div>
                      </div>
                      <v-empty :isShow="levelList.length==0"></v-empty>
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
                            <input class="form-control inline mw-100 m-l-sm m-r-sm" v-model="proporation.money" maxlength="8">元 = <input class="form-control inline mw-100 m-l-sm m-r-sm" maxlength="5" v-model="proporation.point">积分
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" type="button" @click="pointSubmit">保存</button>
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
import vEmpty from "@/components/empty/empty.vue";

import superConst  from "../../util/super-const";
import regex from "../../util/regex";

export default {
  components: {
    vMenus,
    vTop,
    vEmpty
  },
  data() {
    return {
      tabType: "Level",     // Level: 等级 Point：积分
      levelList: [],        // 等级的数据集合  {startPoint:0,endPoint:100,name:'VOP'}
      proporation: {
        money:0,
        point:0
      }
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

      if(!regex.gtZeroNumer(cur.endPoint) || cur.endPoint < cur.startPoint){
          cur.endPoint = Number(cur.startPoint) + Number(superConst.POINT_INTEVAL);
      }
      _this.$lodash.forEach(_this.levelList,function(item,index){
        if(index>curIndex){
          let pre = _this.levelList[index - 1];
          if(pre){
            item.startPoint = pre.endPoint;
            if(item.endPoint < item.startPoint){
              item.endPoint = Number(item.startPoint) + Number(superConst.POINT_INTEVAL);
            }
          }
        }
      })
    },
    tabChange: function(tabType) {
      let _this = this;
      _this.tabType = tabType;
      switch (tabType) {
        case "Level":{
          _this.getLevelList();
        }break;
        case "Point":{
          _this.getPoint();
        }break;
      }
    },
    getLevelList: function (){ // 如果没有自动加一条记录
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios.get('levels').
        then((result)=> {
          var res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.levelList = res;
            if(res.length==0){
              _this.levelList.push({startPoint:0,endPoint:superConst.POINT_INTEVAL,name:'VIP'});
            }
          }
          _this.SHIFT_LOADING();
      }).catch((err) => {
          _this.SHIFT_LOADING();
      });
    },
    addLevel:function (){
      let _this = this;
      let len = _this.levelList.length;
      if(len == 0){
        _this.levelList.push({startPoint:0,endPoint:superConst.POINT_INTEVAL,name:'VIP'});
      }else{
        let lastIndex = len - 1;
        let last = _this.levelList[lastIndex];
        last.endPoint = Number(last.startPoint) + Number(superConst.POINT_INTEVAL);

        let startPoint = Number(last.endPoint);
        let endPoint = Number(last.endPoint) + Number(superConst.POINT_INTEVAL);

        _this.levelList.push({startPoint: startPoint,endPoint: endPoint,name:'VIP'});    
      }
    },
    removeLevel:function(index){
       let _this = this;
       _this.levelList.splice(index,1);
    },
    levelSubmit:function(){
      let _this = this; // 验证
      let errors = [];
      _this.$lodash.forEach(_this.levelList,function (item){
         if(!regex.gtZeroNumer(item.endPoint)){
           errors.push('等级【'+item.name+'】结束积分格式不正确');
         }
      });
      if(errors.length>0){
         _this.$toast.warning(errors.join('<br/>'));
      }
      let len = _this.levelList.length;
      let last = _this.levelList[len - 1];
      last.endPoint = 2147483647;
      this.PUSH_LOADING();
      _this.$axios.post('levels',_this.levelList).
        then((result)=> {
          var res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.$toast.success("操作成功");
            _this.getLevelList();
          }
          _this.SHIFT_LOADING();
      }).catch((err) => {
          _this.SHIFT_LOADING();
      });
    },
    getPoint:function(){
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios.get('proportion').
        then((result)=> {
          var res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.proporation = res;
          }
          _this.SHIFT_LOADING();
      }).catch((err) => {
          _this.SHIFT_LOADING();
      });
    },
    pointSubmit:function(){
      let _this = this;
      if(!regex.money(_this.proporation.money)){
         _this.$toast.warning("金额格式不正确");
        return false;
      }
      if(!regex.gtZeroNumer(_this.proporation.point)){
         _this.$toast.warning("积分格式不正确");
        return false;
      }

      _this.PUSH_LOADING();
      _this.$axios.post('proportion',_this.proporation).
        then((result)=> {
          var res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
             _this.$toast.success("操作成功");
             _this.getPoint();
          }
          _this.SHIFT_LOADING();
      }).catch((err) => {
          _this.SHIFT_LOADING();
      });
    }
  }
};
</script>

<style>

</style>
