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
                      <router-link to="product/v_save" class="btn btn-primary btn-sm">新增产品</router-link>
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
                        <input type="text" placeholder="搜索项目名称/发布人/承接人" class="input-sm form-control" v-model="adv.queryKey" maxlength="20">
                        <span class="input-group-btn">
                        <button @click="rearchSubmit" type="button" class="btn btn-sm btn-primary"> 搜索</button>
                        </span></div>
                    </div>
                    <button type="button" class="btn btn-sm btn-white " data-toggle="modal" href="#search-more">高级搜索</button>
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
                      <tr>
                        <td class="text-center"><input type="checkbox"  checked class="i-checks" name="input[]"></td>
                        <td>
                          <img class="img-md" src="img/gallery/2.jpg"> 超级悬赏杯
                        </td>
                        <td> ¥99</td>
                        <td>开售</td>
                        <td>
                          <a class="btn btn-white btn-sm" href="edit-product.html">查看</a>
                        </td>
                      </tr>
                      <tr>
                          <td class="text-center"><input type="checkbox"   class="i-checks" name="input[]"></td>
                        <td>
                          <img class="img-md" src="img/gallery/2.jpg"> 大威威客
                        </td>
                        <td> ¥10000</td>
                        <td>停售</td>
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
import superConst from "../../util/super-const";
import regex from "../../util/regex";
import pagination from "@/components/pagination/pagination.vue";

export default {
  components: {
    vMenus,
    vTop,
    vFoot
  },
  data() {
    return {
        adv:{
          status:'',
          statusText:'全部',
          queryKey:''
        },
        productList:[],
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
    statusChange:function(status){
        let _this = this;
        switch (status) {
            case "All":{
                _this.adv.status = '';
                _this.adv.statusText = '全部';
            }break;
            case "Sales":{
                _this.adv.status = 'onSales';
                _this.adv.statusText = '在售';
            }break;
            case "StopSales":{
                _this.adv.status = 'noSales';
                _this.adv.statusText = '停售';
            }break;
        }
        _this.parentCurrentpage = 1;
        _this.getProductList();
    },
    rearchSubmit:function(){
        let _this = this;
        _this.parentCurrentpage = 1;
        _this.getProductList();
    },
    getProductList() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.parentCurrentpage);
      param.push("pageSize=" + 15);
      if (!_this.$lodash.isEmpty(_this.adv.queryKey)) {
        param.push("queryKey=" + _this.adv.queryKey);
      }
      if (parseInt(_this.adv.status) > -1) {
        param.push("status=" + _this.adv.status);
      }
      _this.$axios
        .get("products?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.pages;
          try{
                _this.$lodash.forEach(res.list, function(item) {
                  _this.$lodash.forEach(item.images,function(img,imgIndex){
                      img.realUrl = imgCdn + img.imageCode;
                  })
                  let curCategory = _this.$lodash.find(_this.categoryList,{id:item.categoriesId});
                  if(curCategory){
                    item.categoriesName = curCategory.categoriesName;
                  }
                  if(_this.levelArr.length == 0){
                      _this.levelArr = _this.$lodash.cloneDeep(item.prices);
                  }
              });
          }catch(e){
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
