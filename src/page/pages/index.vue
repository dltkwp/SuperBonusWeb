<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
        <div class="wrapper wrapper-content ">
            <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-title">单页列表</div>
                <div class="ibox-content">
                  <div class="row m-b-sm ">
                    <div class="col-lg-12">
                      <div class="pull-left">
                        <router-link   v-permission="{code:'page_insert'}"   to="/pages/v_save" class="btn btn-primary btn-sm">新增单页</router-link>

                        <div class="btn-group btn-group-sm"  v-permission="{code:'page_delete'}"   >
                          <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false">批量操作 <span class="caret"></span></button>
                          <ul class="dropdown-menu">
                            <li @click="showBathDelConfirmModal"><a  href="javascript:;;">删除</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-bordered table-stripped table-hover ">
                      <thead>
                        <tr>
                        <th class="text-center"> <input type="checkbox"  class="i-checks" v-model="checkAll" v-bind:checked="checkAll" @click="selectAllClick($event)"> </th>
                          <th> # </th>
                          <th> 标题 </th>
                          <th> 类型 </th>
                          <th> 发布时间 </th>
                          <th> 发布人 </th>
                          <th> 操作 </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item,index) in list" :key='index'>
                          <td class="text-center">
                            <input type="checkbox" :readonly="!item.type=='adv'" :disabled="!item.type=='adv'"  class="i-checks" v-bind:checked="ids.indexOf(item.id)>=0" @click="itemClick($event,index)">
                          </td>
                          <td> {{index + 1}}</td>
                          <td> {{item.title}}</td>
                          <td> {{item.typeName}}</td>
                          <td> {{item.createdStr}}</td>
                          <td> {{item.realname}}</td>
                          <td>
                            <router-link :to="{path:'/pages/v_detail',query:{ id: item.id }}" class="btn btn-primary btn-sm">查看</router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <v-empty :isShow="parentTotalPage==0"></v-empty>
                    <page :pageSize="pageSize" v-if="parentTotalPage>0" :total="parentTotalPage" show-total :current="pageNo" @on-change="parentCallback"></page>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


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
                    确定要删除吗？<br/> 只能删除广告类型的单页面
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
import vEmpty from "@/components/empty/empty.vue";

import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util";
import { Page } from 'iview'

export default {
  components: {
    vMenus,
    vTop,
    vEmpty,
    Page
  },
  data() {
    return {
      list: [],
      ids: [],
      checkAll: false,
      parentTotalPage: 0,
      pageNo: 1,
      pageSize:15
    };
  },
  mounted() {
    let _this = this;
    _this.getList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    showBathDelConfirmModal: function () {
        let _this = this;
        if(_this.ids.length === 0){
          _this.$toast.warning('请选择要操作的产品');
          return false;
        }
        $("#deleteConfirmMdoal").modal('show');
    },
    batchDeleteSubmit: function () {
        let _this = this;
        _this.PUSH_LOADING();
        _this.$axios
          .delete("pages?pagesIds=" + _this.ids.join(','))
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
    selectAllClick: function(event) {
      let _this = this;
      if (event.target.checked) {
        let advArr = _this.$lodash.filter(_this.list,{type:"adv"})
        let tempIds = _this.$lodash.map(advArr, "id");
        _this.ids = tempIds;
      } else {
        _this.ids = [];
      }
    },
    itemClick: function(event, index) {
      let _this = this;
      let cur = _this.list[index];
      let curIndex = _this.ids.indexOf(cur.id);
      if (event.target.checked) {
        if (curIndex == -1) {
          _this.ids.push(cur.id);
        }
        _this.checkAll = _this.list.length == _this.ids.length;
      } else {
        if (curIndex >= 0) {
          _this.ids.splice(curIndex, 1);
          _this.checkAll = false;
        }
      }
    },
    parentCallback(cPage) {
      let _this = this;
      _this.ids = [];
      _this.checkAll = false;
      _this.pageNo = cPage;
      _this.list();
    },
    getList: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.pageNo);
      param.push("pageSize=" + _this.pageSize);
      _this.$axios
        .get("customPages?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.total;
          try {
            _this.$lodash.forEach(res.list, function(item) {
               item.createdStr = item.createDate ? _this.$moment(item.createDate).format('YYYY/MM/DD'): '';
               item.typeName = _this.$lodash.find(superConst.PAGE_TYPES_LIST,{value:item.type}).name
            });
          } catch (e) {
            console.error(e);
          }
          _this.list = res.list;
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
