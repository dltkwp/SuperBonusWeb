<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
        <!-- 主内容 开始 -->
         <div class="row">
          <div class="col-lg-12">
            <div class="ibox">
              <div class="ibox-title">产品列表</div>
              <div class="ibox-content">
                <div class="row m-b-sm ">
                  <div class="col-lg-12">
                  <div class="pull-left">
                      <router-link to="/product/v_save" class="btn btn-primary btn-sm">新增产品</router-link>
                      <a class="btn btn-white btn-sm" data-toggle="modal" href="#product-set">批量设置</a>
                  </div>
                  <div class="pull-right text-right">
                    <div class="btn-group btn-group-sm">
                      <button data-toggle="dropdown" class="btn btn-white dropdown-toggle" aria-expanded="false">{{adv.statusText}}<span class="caret"></span></button>
                      <ul class="dropdown-menu">
                        <li><a href="javascript:;;" @click="statusChange('All')">全部</a></li>
                        <li><a href="javascript:;;" @click="statusChange('Sales')">开售</a></li>
                        <li><a href="javascript:;;" @click="statusChange('StopSales')">停售</a></li>
                      </ul>
                    </div>
                    <div class="search-box">
                      <div class="input-group">
                        <input type="text" placeholder="搜索产品名称" class="input-sm form-control" v-model="adv.queryKey" maxlength="20">
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
                        <th class="text-center"> <input type="checkbox"   class="i-checks" name="input[]"> </th>
                        <th> 名称 </th>
                        <th> 售价 </th>
                        <th>状态 </th>
                        <th> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in productList" :key='index'>
                        <td class="text-center">
                            <input type="checkbox"  checked class="i-checks" name="productCheckName">
                        </td>
                        <td>
                          <img class="img-md" v-bind:src="item.imageUrl"> {{item.productName}}
                        </td>
                        <td> ¥{{itme.price}}</td>
                        <td>{{item.status==1?'开售':'停售'}}</td>
                        <td>
                          <a class="btn btn-white btn-sm" href="edit-product.html">查看</a>
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
        <!-- 主内容 结束 -->
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
      adv: {
        status: "",
        statusText: "全部",
        queryKey: ""
      },
      productList: [],
      parentTotalPage: 0,
      parentCurrentpage: 1
    };
  },
  mounted() {
    let _this = this;
    _this.getProductList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    parentCallback(cPage) {
      this.parentCurrentpage = cPage;
      this.listData();
    },
    statusChange: function(status) {
      let _this = this;
      switch (status) {
        case "All":
          {
            _this.adv.status = "";
            _this.adv.statusText = "全部";
          }
          break;
        case "Sales":
          {
            _this.adv.status = 1;
            _this.adv.statusText = "开售";
          }
          break;
        case "StopSales":
          {
            _this.adv.status = 0;
            _this.adv.statusText = "停售";
          }
          break;
      }
      _this.parentCurrentpage = 1;
      _this.getProductList();
    },
    rearchSubmit: function() {
      let _this = this;
      _this.parentCurrentpage = 1;
      _this.getProductList();
    },
    getProductList() {
      let _this = this;
      console.log(_this.adv);
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.parentCurrentpage);
      param.push("pageSize=" + 15);
      if (!_this.$lodash.isEmpty(_this.adv.queryKey)) {
        param.push("queryKey=" + _this.adv.queryKey);
      }
      if (_this.adv.status != '') {
        param.push("status=" + _this.adv.status);
      } else { // 测试代码
        param.push("status=1");
      }
      _this.$axios
        .get("products?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.pages;
          try {
            _this.$lodash.forEach(res.list, function(item) {

              if(item.images){
                let imagesArr = item.images.split(',');
                if(imagesArr.length>0){
                  item.imageUrl = superConst.IMAGE_STATIC_URL + imagesArr[0];
                }else {
                  item.imageUrl = ''; // 产品默认图片
                }
              }else{
                item.imageUrl = ''; // 产品默认图片
              }
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
    }
  }
};
</script>

<style>

</style>
