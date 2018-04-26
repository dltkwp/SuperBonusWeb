<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
        <div class="wrapper wrapper-content ">
           <div class="row">
            <div class="col-lg-12">
             <div class="ibox">
              <div class="ibox-title">订单列表</div>
              <div class="ibox-content">
                <div class="row m-b-sm ">
                  <div class="col-lg-12">
                    <div class=" pull-right text-right">
                      <div class="search-box">
                        <div class="input-group">
                          <input type="text" placeholder="搜索订单编号/内容/会员名称或电话" class="input-sm form-control" maxlength="20" v-model="queryKey">
                          <span class="input-group-btn">
                          <button @click="rearchSubmit" type="button" class="btn btn-sm btn-primary"> 搜索</button>
                        </span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered  table-hover">
                    <thead>
                      <tr>
                        <th>订单编号</th>
                        <th>订单内容</th>
                        <th>购买人</th>
                        <th>付款时间</th>
                        <th>支付方式</th>
                        <th>金额</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in list" :key="index">
                        <td>
                          {{item.orderNo}}
                        </td>
                        <td>
                          {{item.productName}}
                        </td>
                          <td> 
                            <img class="img-sm pull-left img-circle" v-bind:src="item.headImage">
                            <div class="pull-left m-l-sm"> 
                               <router-link :to="{path:'/member/v_detail',query:{memberId:item.createUser}}">{{item.realname||item.nickname}}<br>{{item.username}}</router-link>
                            </div>
                          </td>
                          <td>
                              {{item.payDateStr}}
                          </td>
                        <td>
                              {{item.payTypeName}}
                        </td>
                        <td>
                          ¥{{item.payment}}
                        </td>
                        <td>
                          已完成
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
      list: [],
      queryKey: '',
      parentTotalPage: 0,
      parentCurrentpage: 1
    };
  },
  mounted() {
    let _this = this;
    _this.parentCurrentpage = 1;
    _this.getOrderList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    rearchSubmit: function() {
        let _this = this;
        _this.parentCurrentpage = 1;
        _this.getOrderList();
    },
    parentCallback(cPage) {
      let _this = this;
      _this.parentCurrentpage = cPage;
      _this.getOrderList();
    },
    getOrderList: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.parentCurrentpage);
      param.push("pageSize=" + 15);
      if (!_this.$lodash.isEmpty(_this.queryKey)) {
        param.push("queryKey=" + _this.queryKey);
      }
      _this.$axios
        .get("orders?" + param.join("&"))
        .then(result => {
          try{
            let res = result.data;
            _this.parentTotalPage = res.pages;
            let arr  = [];
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
              item.payTypeName = util.getPayTypeName(item.payType);
              item.createDateStr = _this.$moment(item.createDate).format('YYYY/MM/DD HH:mm');
              item.payDateStr = _this.$moment(item.payDate).format('YYYY/MM/DD HH:mm');
              arr.push(item);
            });
            _this.list = arr;
          }catch(e){
            console.error(e);
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
