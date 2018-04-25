<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
           <div class="row">
          <div class="col-lg-12">
            <div class="ibox">
              <div class="ibox-content">
                <div class="row ">
                  <div class="col-md-8">
                    <div class="profile-image">
                      <img v-bind:src="user.headImage" class="img-circle circle-border m-b-md" alt="profile">
                    </div>
                    <div class="profile-info">
                      <div class="m-t-sm">
                        <div>
                          <h2 class="no-margins">
                            {{user.realname || user.nickname}}<span class="font-md m-l-sm">&nbsp;&nbsp;{{user.levelName}}</span>
                         </h2>
                        </div>
                      </div>
                      <table class="table small m-b-xs m-t-sm">
                        <tbody>
                          <tr>
                            <td>
                              <strong>编号：</strong> 01
                            </td>
                            <td>
                              <strong>手机：</strong> {{user.username}}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>企业：</strong> {{user.enterprise}}
                            </td>
                            <td>
                              <strong>职位：</strong>  {{user.userPosition}}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>注册时间：</strong> {{user.createDateStr}}
                            </td>
                            <td>
                              <strong>支付宝：</strong> {{user.alipay}}
                            </td>

                          </tr>
                          <tr>
                            <td colspan="2">
                              <strong>联系地址：</strong> {{user.address}}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="col-md-2 col-md-offset-2 text-right">
                      <router-link :to="{path:'/product/v_edit',query:{ productId: user.id }}" class="btn btn-white">编辑资料</router-link>
                  </div>
                </div>
                <div class="row m-t-sm">
                  <div class="col-lg-12">
                    <div class="panel blank-panel">
                      <div class="panel-heading">
                        <div class="panel-options">
                          <ul class="nav nav-tabs">
                            <li class="active"><a href="javascript:;;" >订单记录</a></li>
                          </ul>
                        </div>
                      </div>
                      <div class="panel-body">
                        <div class="tab-content">
                          <div class="tab-pane active">
                            <table class="table table-striped">
                              <thead>
                                <tr>
                                  <th>订单编号</th>
                                  <th>订单内容</th>
                                  <th>付款时间</th>
                                  <th>支付方式</th>
                                  <th>金额</th>
                                  <th>状态</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item,index) in order.list" :key='index'>
                                  <td>
                                    {{item.orderNo}}
                                  </td>
                                  <td>
                                    {{item.productName}}
                                  </td>
                                  <td>
                                    {{item.createDateStr}}
                                  </td>
                                  <td>
                                    {{item.payType}}
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
                             <v-empty :isShow="order.parentTotalPage==0"></v-empty>
                            <pagination :totalPage="order.parentTotalPage" :currentPage="order.parentCurrentpage" :changeCallback="orderParentCallback"></pagination>
                          </div>
                        </div>
                      </div>
                    </div>
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
import vEmpty from "@/components/empty/empty.vue";
import pagination from "@/components/pagination/pagination.vue";

import moment from "../../util/moment"
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
      order: {
        list: [],
        parentTotalPage: 0,
        parentCurrentpage: 1
      },
      user:{},
      memberId:0
    };
  },
  mounted() {
    let _this = this;
    _this.SHIFT_LOADING();
    
    _this.memberId = _this.$route.query.memberId;
    _this.getUserDetail();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    orderParentCallback: function(cPage) {
      let _this = this;
      _this.order.parentCurrentpage = cPage;
      _this.getOrderList();
    },
    getOrderList: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.order.parentCurrentpage);
      param.push("pageSize=" + 15);
      param.push("userId=" + _this.memberId);
      
      _this.$axios
        .get("orders?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.order.parentTotalPage = res.pages;
          let arr = [];
          _this.$lodash.forEach(res.list, function(item) {
            item.createDateStr = _this.$moment(item.createDate).format('YYYY/MM/DD HH:mm');
            arr.push(item);
          });
          _this.order.list = arr;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    getUserDetail: function () {
        let _this = this;
        _this.PUSH_LOADING();
        _this.$axios
            .get("users/" + _this.memberId)
            .then(result => {
                try{
                  let res = result.data;
                  if (res.headImage){
                    let httpIndex = res.headImage.indexOf('http');
                    if (httpIndex == -1) {
                      res.headImage = superConst.IMAGE_STATIC_URL + res.headImage;
                    } 
                  }else{
                    res.headImage = superConst.HEAD_IMAGE_DEFAULT;
                  }
                  if(res.createDate) {
                    res.createDateStr = _this.$moment(res.createDate).format('YYYY/MM/DD HH:mm');
                  }
                  _this.user = res;
                  _this.SHIFT_LOADING();
                  _this.getOrderList();

                }catch (e) {
                  console.error(e);
                }
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
