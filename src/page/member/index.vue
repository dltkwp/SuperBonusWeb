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
                    <!-- <div class="pull-left">
                      <a class="btn btn-primary btn-sm" href="add-member.html">新增会员</a>
                    </div> -->
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
                      <tr>
                        <td>1</td>
                        <td>
                          001

                        </td>
                        <td> <img class="img-sm pull-left img-circle" src="img/gallery/2.jpg">
                          <div class="pull-left m-l-sm"> <a href="member-detail.html">张三<br>
                                        15100000000
                                  </a></div>
                        </td>
                        <td> 大威威客</td>
                        <td>2018/04/01</td>
                        <td>大连乐维科技有限公司</td>
                        <td>经理</td>

                        <td>15242612898</td>
                        <td>
                          <a class="btn btn-white btn-sm" href="member-detail.html">查看</a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          002
                        </td>
                        <td> <img class="img-sm pull-left img-circle" src="img/gallery/1.jpg">
                          <div class="pull-left m-l-sm"> <a href="member-detail.html">张三<br>
                                15100000000
                            </a></div>
                        </td>
                        <td> 超级大威</td>
                        <td>2018/04/01</td>
                        <td>大连乐维科技有限公司</td>
                        <td>经理</td>
                        <td>15242612898</td>
                        <td>
                          <a class="btn btn-white btn-sm" href="member-detail.html">查看</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
      parentCurrentpage: 1
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
                try {
                    _this.$lodash.forEach(res.list, function(item) {
                        
                    });
                } catch (e) {
                    console.error(e);
                }
                _this.productList = res.list;
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
