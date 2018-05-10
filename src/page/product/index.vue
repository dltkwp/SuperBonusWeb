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
                      <div class="btn-group btn-group-sm">
                          <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false">批量操作 <span class="caret"></span></button>
                          <ul class="dropdown-menu">
                              <li><a href="javascript:;;"  @click="showBathOptModal">设置</a></li>
                              <li><a href="javascript:;;"  @click="showBathDelConfirmModal">删除</a></li>
                          </ul>
                      </div>
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
                          <input type="checkbox" @click="selectAllClick($event)" class="i-checks" name="selectAll">
                        </th>
                        <th> 名称 </th>
                        <th> 售价 </th>
                        <th> 状态 </th>
                        <th> 移动 </th>                        
                        <th> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in productList" :key='index' @click.stop="gotoDetail(index)" style="cursor:pointer;">
                        <td class="text-center">
                            <input type="checkbox" v-bind:checked="productIds.indexOf(item.id)>=0" @click.stop="itemClick(index)" class="i-checks" name="productCheckName" style="z-index:9999">
                        </td>
                        <td>
                          <img class="img-md" v-bind:src="item.imageUrl"> {{item.productName}}
                        </td>
                        <td> ¥{{item.price}}</td>
                        <td>{{item.statusName || '停售'}}</td>
                        <td>
                          <span class="btn btn-default" @click.stop="orderSubmit('up',index)" v-if="index>0" title="向上移动" style="z-index:9999"><i class="fa fa-long-arrow-up"></i></span>
                          <span class="btn btn-default" @click.stop="orderSubmit('down',index)"  v-if="index<productList.length-1" title="向下移动" style="z-index:9999"><i class="fa fa-long-arrow-down"></i></span>
                        </td>
                        <td>
                          <router-link :to="{path:'/product/v_detail',query:{ productId: item.id }}" class="btn btn-white btn-sm">查看</router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <v-empty :isShow="parentTotalPage==0"></v-empty>
                  <page v-if="parentTotalPage>0" :total="parentTotalPage" show-total :current="parentCurrentpage" @on-change="parentCallback"></page>
                  
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

    <!-- 批量操作 删除 开始-->
    <div id="deleteConfirmMdoal" class="modal fade" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">温馨提示</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="alert alert-danger">
                  确定要删除吗？
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="batchDeleteSubmit" class="btn btn-primary">确定</button>
            <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 批量操作 删除 结束-->

   </div>



</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import vFoot from "@/components/foot/foot.vue";
import vEmpty from "@/components/empty/empty.vue";
import { Page } from 'iview'


import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util"

export default {
  components: {
    vMenus,
    vTop,
    vFoot,
    vEmpty,
    Page
  },
  data() {
    return {
      adv: {
        status: -1,
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
    _this.SHIFT_LOADING();

    _this.getProductList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    /**
     * direct: 方向
     * index: 当前索引
     */
    orderSubmit: function (direct,index) {
        let _this = this;

        let param = [];
        let cur = _this.productList[index];
        switch(direct){
          case 'up':{
            let per = _this.productList[index - 1];
            param.push('productId1=' + cur.id);
            param.push('productOrder1=' + cur.productOrder);
            param.push('productId2=' + per.id);
            param.push('productOrder2=' + per.productOrder);
          }break;
          case 'down':{
            let _next = _this.productList[index + 1];
            param.push('productId1=' + cur.id);
            param.push('productId2=' + _next.id);
            param.push('productOrder1=' + cur.productOrder);
            param.push('productOrder2=' + _next.productOrder);
          }break;
        }

        _this.PUSH_LOADING();
        _this.$axios
          .post("product/order?" + param.join('&'))
          .then(result => {
            let res = result.data;
            if (res.code && res.code > 0){
              _this.$toast.error(res.msg);
            } else {
              _this.productIds = [];
              _this.$toast.success('操作成功');
              _this.getProductList();
            }
            _this.SHIFT_LOADING();
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
    },
    gotoDetail: function (index) {
      let _this = this;
      let cur = _this.productList[index];
      window.location.href = '/product/v_detail?productId=' + cur.id;
    },
    batchDeleteSubmit: function () {
       let _this = this;
        _this.PUSH_LOADING();

        _this.$axios
          .delete("products?productIds=" + _this.productIds.join(','))
          .then(result => {
            let res = result.data;
            if (res.code && res.code > 0){
              _this.$toast.error(res.msg);
            } else {
              _this.productIds = [];
              _this.$toast.success('操作成功');
              $("#deleteConfirmMdoal").modal('hide');
              _this.getProductList();
            }
            _this.SHIFT_LOADING();
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });

    },
    showBathDelConfirmModal: function () {
      let _this = this;
      if(_this.productIds.length === 0){
        _this.$toast.warning('请选择要操作的产品');
        return false;
      }
      $("#deleteConfirmMdoal").modal('show');
    },
    batchStatusChange: function (status) {
      let _this = this;
      _this.batch.status = Number(status);
    },
    selectAllClick: function(event){
      let _this = this;
      if(event.target.checked){
        let tempProductIds = _this.$lodash.map(_this.productList,'id');
        _this.productIds = tempProductIds;
      }else{
        _this.productIds = [];
      }
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
            _this.adv.status = -1;
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
      if (_this.adv.status != -1) {
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
