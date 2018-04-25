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
                      <a class="btn btn-white btn-sm" @click="showBathOptModal">批量设置</a>
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
                        <th class="text-center"> 
                          <input type="checkbox" @click="selectAllClick" class="i-checks" name="selectAll"> 
                        </th>
                        <th> 名称 </th>
                        <th> 售价 </th>
                        <th> 状态 </th>
                        <th> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in productList" :key='index'>
                        <td class="text-center">
                            <input type="checkbox" v-bind:checked="productIds.indexOf(item.id)>=0" @click="itemClick(index)" class="i-checks" name="productCheckName">
                        </td>
                        <td>
                          <img class="img-md" v-bind:src="item.imageUrl"> {{item.productName}}
                        </td>
                        <td> ¥{{item.price}}</td>
                        <td>{{item.statusName || '停售'}}</td>
                        <td>
                          <router-link :to="{path:'/product/v_detail',query:{ productId: item.id }}" class="btn btn-white btn-sm">查看</router-link>
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

    <!-- 批量操作 start-->
    <div id="batchOptModal" class="modal fade" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">批量设置</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <form class="form-horizontal">

                  <div class="form-group">
                    <label class="col-lg-3 control-label">状态</label>
                    <div class="col-lg-8">
                      <label class="radio-inline">
                        <input type="radio" class="i-radio" v-bind:checked="batch.status==1" name="bathStatus" v-model="batch.status" @click="batchStatusChange(1)" value="1">开售 </label>
                      <label class="checkbox-inline">
                        <input type="radio"  v-bind:checked="batch.status==0"   name="bathStatus" v-model="batch.status"  @click="batchStatusChange(0)" value="0">停售 </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="bathSubmit" class="btn btn-primary">保存</button>
            <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 批量操作 end-->


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
import util from "../../util/util"

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
      batch: {
        status: 1
      },
      productList: [],
      parentTotalPage: 0,
      parentCurrentpage: 1,
      productIds: [], // 当前页面选择的产品ids
    };
  },
  mounted() {
    let _this = this;
    _this.getProductList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    batchStatusChange: function (status) {
      let _this = this;
      _this.batch.status = Number(status);
    },
    selectAllClick: function(){
      let _this = this;
      let tempProductIds = _this.$lodash.map(_this.productList,'id');
      _this.productIds = tempProductIds;
    },
    itemClick: function(index){
      let _this = this;
      let cur = _this.productList[index];
      let curIndex = _this.productIds.indexOf(cur.id);
      if(curIndex==-1){
        _this.productIds.push(cur.id);
      }else{
        _this.productIds.split(curIndex,1)
      }
    },
    showBathOptModal: function (){
      let _this = this;
      if(_this.productIds.length === 0){
        _this.$toast.warning('请选择要操作的产品');
        return false;
      }
      _this.batch.status = 1;
      $('#batchOptModal').modal('show');
    },
    bathSubmit: function (){
      let _this = this;
      _this.PUSH_LOADING();
     
      _this.$axios
        .post("product/status",{
          productIds: _this.productIds,
          status: _this.batch.status == 1
        })
        .then(result => {
          let res = result.data;
          if (res.code && res.code > 0){
            _this.$toast.error(res.msg);
          } else {
            _this.productIds = [];
            _this.$toast.success('操作成功');
            $("#batchOptModal").modal('hide');
            _this.getProductList();
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    parentCallback(cPage) {
      let _this = this;
      _this.productIds = [];
      _this.parentCurrentpage = cPage;
      _this.listData();
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
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.parentCurrentpage);
      param.push("pageSize=" + 15);
      if (!_this.$lodash.isEmpty(_this.adv.queryKey)) {
        param.push("queryKey=" + _this.adv.queryKey);
      }
      if (_this.adv.status != '') {
        param.push("status=" + _this.adv.status);
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
