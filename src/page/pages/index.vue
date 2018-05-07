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
                      <router-link to="/pages/v_save" class="btn btn-primary btn-sm">新增单页</router-link>

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
                       <th class="text-center"> <input type="checkbox"  class="i-checks" v-model="checkAll" v-bind:checked="checkAll" @click="selectAllClick($event)"> </th>
                        <th> # </th>
                        <th> 标题 </th>
                        <th> 发布时间 </th>
                        <th> 发布人 </th>
                        <th> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in list" :key='index'>
                        <td class="text-center">
                          <input type="checkbox"  class="i-checks" v-bind:checked="ids.indexOf(item.id)>=0" @click="itemClick($event,index)">
                        </td>
                        <td> {{index + 1}}</td>
                        <td> {{item.title}}</td>
                        <td> {{item.createdStr}}</td>
                        <td> {{item.creator}}</td>
                        <td>
                           <router-link :to="{url:'/pages/v_detail',query:{ id: item.id }}" class="btn btn-primary btn-sm">查看</router-link>
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
      ids: [],
      checkAll: false,
      parentTotalPage: 0,
      parentCurrentpage: 1
    };
  },
  mounted() {
    let _this = this;
    _this.getList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
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
      _this.parentCurrentpage = cPage;
      _this.list();
    },
    getList: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.parentCurrentpage);
      param.push("pageSize=" + 15);
      _this.$axios
        .get("customPages?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.pages;
          try {
            _this.$lodash.forEach(res.list, function(item) {
               item.createdStr = _this.$moment(item.created).format('YYYY/MM/DD');
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
