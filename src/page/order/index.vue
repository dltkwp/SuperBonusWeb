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
                      <tr v-for="(item,index) in orderList" :key="index">
                        <td>
                          0001
                        </td>
                        <td>
                          超级悬赏杯
                        </td>

                          <td> <img class="img-sm pull-left img-circle" src="img/gallery/2.jpg">
                            <div class="pull-left m-l-sm"> <a href="member-detail.html">张三<br>
                                          15100000000
                                    </a></div>
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
      orderList: [],
      queryKey: '',
      parentTotalPage: 0,
      parentCurrentpage: 1
    };
  },
  mounted() {
    let _this = this;
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
          let res = result.data;
          _this.parentTotalPage = res.pages;
          _this.orderList = res.list;
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
