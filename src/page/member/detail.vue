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
                      <img src="img/a4.jpg" class="img-circle circle-border m-b-md" alt="profile">
                    </div>
                    <div class="profile-info">
                      <div class="m-t-sm">
                        <div>
                          <h2 class="no-margins">
                            张三<span class="font-md m-l-sm">超级大威</span>
                         </h2>
                        </div>
                      </div>
                      <table class="table small m-b-xs m-t-sm">
                        <tbody>
                          <tr>
                            <td>
                              <strong>编号：</strong> 1524261288
                            </td>
                            <td>
                              <strong>手机：</strong> 1524261288
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>企业：</strong> 大连乐维科技有限公司
                            </td>
                            <td>
                              <strong>职位：</strong> 经理
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>注册时间：</strong> 2018/04/01
                            </td>
                            <td>
                              <strong>支付宝：</strong> 15242612898
                            </td>

                          </tr>
                          <tr>

                            <td colspan="2">
                              <strong>联系地址：</strong> 辽宁省大连市高新园区招商兰溪谷
                            </td>

                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="col-md-2 col-md-offset-2 text-right">
                      <router-link :to="{path:'/product/v_edit',query:{ productId: item.id }}" class="btn btn-white">编辑资料</router-link>
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
                                    0001
                                  </td>
                                  <td>
                                    超级悬赏杯
                                  </td>
                                  <td>
                                    2018/04/01 12:20
                                  </td>
                                  <td>
                                    微信
                                  </td>
                                  <td>
                                    ¥100
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
      user:{}
    };
  },
  mounted() {
    let _this = this;
    _this.getUserDetail();
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
      
      _this.$axios
        .get("orders?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.order.parentTotalPage = res.pages;
          _this.order.list = res.list;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    getUserDetail: function () {
        let _this = this;
        let id = _this.$route.query.memberId;

        _this.PUSH_LOADING();

        _this.$axios
            .get("users/" + id)
            .then(result => {
                let res = result.data;
                _this.user = res;
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
