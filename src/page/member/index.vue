<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
           <div class="row">
          <div class="col-lg-12">
            <div class="ibox">
              <div class="ibox-title">会员列表</div>
              <div class="ibox-content">
                <div class="row m-b-sm ">
                  <div class="col-lg-12">
                    <div class=" pull-right text-right">
                      <div class="btn-group btn-group-sm">
                        <button data-toggle="dropdown" class="btn btn-white dropdown-toggle" aria-expanded="false">{{curLevel.name||'全部'}} <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                          <li @click="selectLevel(index)" v-for="(item,index) in levelList" :key="index"><a href="javascript:;;">{{item.name}}</a></li>
                        </ul>
                      </div>
                      <div class="search-box">
                        <div class="input-group">
                          <input type="text" placeholder="搜索会员名称或电话" class="input-sm form-control" v-model="queryKey" maxlength="20">
                          <span class="input-group-btn">
                        <button @click="rearchSubmit" type="button" class="btn btn-sm btn-primary"> 搜索</button>
                        </span></div>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="table table-bordered table-stripped table-hover">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> 编号 </th>
                        <th> 会员 </th>
                        <th> 等级 </th>
                        <th>注册时间 </th>
                        <th>企业 </th>
                        <th>职位 </th>
                        <th>支付宝账号 </th>
                        <th> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in userList" :key="index">
                        <td>{{index + 1}}</td>
                        <td>
                          {{item.id}}
                        </td>
                        <td> 
                          <img v-if="item.headImage" class="img-sm pull-left img-circle" v-bind:src="item.headImage">
                          <div class="pull-left m-l-sm"> 
                             <router-link :to="{path:'/member/v_detail',query:{memberId:item.id}}">
                                {{item.realname||item.nickname}}<br>{{item.username}}
                             </router-link>
                          </div>
                        </td>
                        <td>{{item.levelName}}</td>
                        <td>{{item.createDateStr}}</td>
                        <td>{{item.enterprise || ''}}</td>
                        <td>{{item.userPosition||''}}</td>
                        <td>{{item.alipay}}</td>
                        <td>
                          <router-link :to="{path:'/member/v_detail',query:{memberId:item.id}}" class="btn btn-white btn-sm">查看</router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <v-empty :isShow="parentTotalPage==0"></v-empty>
                  <pagination :totalPage="parentTotalPage" :currentPage="parentCurrentpage" :changeCallback="parentCallback"></pagination>

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
import vEmpty from "@/components/empty/empty.vue";
import pagination from "@/components/pagination/pagination.vue";

import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util";

export default {
  components: {
    vMenus,
    vTop,
    vFoot,
    vEmpty,
    pagination
  },
  data() {
    return {
      levelList: [],
      curLevel: {},
      queryKey: '',
      parentTotalPage: 0,
      parentCurrentpage: 1,
      userList: []
    };
  },
  mounted() {
    let _this = this;
    _this.SHIFT_LOADING();
    _this.parentCurrentpage = 1;
    _this.getLevelList();
    _this.getMemberList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    rearchSubmit: function (){
        let _this = this;
        _this.parentCurrentpage = 1;
        _this.getMemberList();
    },
    selectLevel: function (index) {
        let _this = this;
        _this.curLevel = _this.levelList[index];
        _this.parentCurrentpage = 1;
        _this.getMemberList();
    },
    parentCallback(cPage) {
      let _this = this;
      _this.productIds = [];
      _this.parentCurrentpage = cPage;
      _this.getMemberList();
    },
    getMemberList: function () {
        let _this = this;

        let param = [];
        param.push("pageNum=" + _this.parentCurrentpage);
        param.push("pageSize=" + 15);
        if (!_this.$lodash.isEmpty(_this.queryKey)) {
            param.push("queryKey=" + _this.queryKey);
        }
        if (_this.curLevel&&_this.curLevel.id){
            param.push("levelId=" + _this.curLevel.id);
        } 

        _this.PUSH_LOADING();
        _this.$axios
            .get("users?" + param.join('&'))
            .then(result => {
                let res = result.data;
                _this.parentTotalPage = res.pages;
                let arr = [];
                _this.$lodash.forEach(res.list, function(item) {
                    let image = item.headImage;
                    if (image){
                      let index = image.indexOf('http');
                      if(index == -1){
                        item.headImage = superConst.IMAGE_STATIC_URL + item.headImage;
                      }
                    }else {
                      item.headImage = superConst.HEAD_IMAGE_DEFAULT;
                    }
                    if (item.createDate) {
                      item.createDateStr = _this.$moment(item.createDate).format('YYYY/MM/DD HH:mm');
                    }
                    arr.push(item);
                });
                _this.userList = arr;
                _this.SHIFT_LOADING();
            })
            .catch(err => {
            _this.SHIFT_LOADING();
            });
    },
    getLevelList: function () {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("levels")
        .then(result => {
          let res = result.data;
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
              let arr = [];
              arr.push({"id":'',"startPoint":0,"endPoint":0,"name":"全部"});
              arr = arr.concat(res);
            _this.levelList = arr;
            _this.curLevel = arr[0];
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    }
  }
};
</script>

<style>

</style>
