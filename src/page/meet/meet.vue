<template>
    <div id="wrapper">
        <v-menus></v-menus>
        <div id="page-wrapper" class="gray-bg">
            <v-top></v-top>
            <div class="wrapper wrapper-content ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox">
                        <div class="ibox-title">圆桌会管理</div>
                        <div class="ibox-content">
                            <div class="row m-b-sm ">
                            <div class="col-lg-12">
                                <div class="pull-left">
                                    <router-link class="btn btn-primary btn-sm" to="/meet/v_add" >新增圆桌会</router-link>
                                <div class="btn-group btn-group-sm">
                                    <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false">批量操作 <span class="caret"></span></button>
                                    <ul class="dropdown-menu">
                                    <li><a data-toggle="modal" href="#delete">删除</a></li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-stripped table-hover ">
                                    <thead>
                                    <tr>
                                        <th> <input type="checkbox"  class="i-checks" v-model="checkAll" v-bind:checked="checkAll" @click="selectAllClick($event)">  </th>
                                        <th> 标题 </th>
                                        <th> 分类 </th>
                                        <th> 发布时间 </th>
                                        <th> 发布人 </th>
                                        <th> 操作 </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in list" :key='index'>
                                            <td><input type="checkbox"  class="i-checks" v-bind:checked="ids.indexOf(item.id)>=0" @click="itemClick($event,index)"></td>
                                            <td> {{item.title}}</td>
                                            <td> {{item.categoryName}}</td>
                                            <td> {{item.createdStr}}</td>
                                            <td> {{item.realname}}</td>
                                            <td>
                                                <router-link class="btn btn-white btn-sm"  :to="{path:'/meet/v_edit', query:{id:item.id}}">查看</router-link>
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
    let _this = this
    _this.SHIFT_LOADING()
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
        let tempIds = _this.$lodash.map(_this.list, "id");
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
          _this.ids.split(curIndex, 1);
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
      param.push("isNewstime=false")
      param.push("type=desk")
      _this.$axios
        .get("news?" + param.join("&"))
        .then(result => {
          let res = result.data;
          if (!res.code) {
            _this.parentTotalPage = res.total;
            try {
                _this.$lodash.forEach(res.list, function(item) {
                    item.createdStr = item.createDate ? _this.$moment(item.createDate).format('YYYY/MM/DD'): '';
                });
            } catch (e) {
                console.error(e);
            }
            _this.list = res.list;
          } else {
            _this.$toast.error(res.msg);
            _this.list = []
            _this.parentTotalPage = 0
          }
         _this.SHIFT_LOADING();
        
        })
        .catch(err => {
          _this.list = []
          _this.parentTotalPage = 0
          _this.SHIFT_LOADING();
        });
    }
  }
};
</script>

<style>

</style>
