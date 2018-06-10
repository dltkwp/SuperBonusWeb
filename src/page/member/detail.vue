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
                      <table class="table small m-b-xs m-t-sm"  style=" margin-top: 42px;">
                        <tbody>
                          <tr>
                            <td>
                              <strong>编号：</strong> {{user.id}}
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
                  <div class="col-md-2 col-md-offset-2 text-right"  v-permission="{code:'user_update'}" >
                      <router-link :to="{path:'/member/v_edit',query:{ memberId: user.id }}" class="btn btn-white">编辑资料</router-link>
                  </div>
                </div>
                <div class="row m-t-sm">
                  <div class="col-lg-12">
                    <div class="panel blank-panel">
                      <div class="panel-heading">
                        <div class="panel-options">
                          <ul class="nav nav-tabs">
                            <li v-bind:class="{active:tabType=='publish'}" @click="tabChange('publish')"><a href="javascript:;;">Ta的发布</a></li>
                            <li v-bind:class="{active:tabType=='taking'}" @click="tabChange('taking')"><a href="javascript:;;">Ta的承接</a></li>
                            <li v-bind:class="{active:tabType=='orderRecords'}" @click="tabChange('orderRecords')"><a href="javascript:;;" >订单记录</a></li>
                          </ul>
                        </div>
                      </div>
                      <div class="panel-body">
                        <div class="tab-content">
                           <div class="tab-pane" v-bind:class="{active:tabType=='publish'||tabType=='taking','':tabType=='orderRecords'}">
                            <div class="project-list">
                              <table class="table table-hover">
                                <tbody>
                                  <tr v-for="(item,index) in list" :key='index'>
                                    <td class="project-status">
                                        <span class="label label-primary" v-if="item.status=='done'">已完成</span>
                                        <span class="label label-warning" v-if="item.status=='undertake'">已承接</span>
                                        <span class="label label-danger"  v-if="item.status=='onCall'">待承接</span>
                                        <span class="label label-danger"  v-if="item.status=='wait'">待审核</span>
                                    </td>
                                    <td class="project-title">
                                      <a href="task-detail.html">{{item.productName}}</a>
                                      <br/>
                                      <small>有效期：{{item.startDateStr}}～{{item.endDateStr}}</small>
                                    </td>
                                    <td class="project-title">赏金：¥ {{item.payment}}</td>
                                    <td class="project-people">
                                      <a href="javascript:;;" v-for="(user,uIndex) in item.users" :key="uIndex">
                                        <img  class="img-circle" v-bind:src="user.headImage">
                                      </a>
                                    </td>
                                    <td class="project-actions">
                                        <router-link :to="{path:'/task/v_detail',query:{taskId:item.id}}" class="btn btn-white btn-sm">查看</router-link>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <v-empty :isShow="order.parentTotalPage==0"></v-empty>
                            <page :pageSize="order.pageSize" v-if="order.parentTotalPage>0" :total="order.parentTotalPage" show-total :current="order.pageNo" @on-change="orderParentCallback"></page>
                            </div>
                          </div>
                          <div class="tab-pane"  v-bind:class="{'':tabType=='publish'||tabType=='taking','active':tabType=='orderRecords'}">
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
                                    {{item.payTypeName}}
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
                            <page  :pageSize="order.pageSize" v-if="order.parentTotalPage>0" :total="order.parentTotalPage" show-total :current="order.pageNo" @on-change="orderParentCallback"></page>
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
import vEmpty from "@/components/empty/empty.vue";
import { Page } from 'iview'

import moment from "../../util/moment"
import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util";

export default {
  components: {
    vMenus,
    vTop,
    vEmpty,
    Page
  },
  data() {
    return {
      order: {
        list: [],
        parentTotalPage: 0,
        pageNo: 1,
        pageSize: 15,
      },
      user:{},
      memberId:0,
      tabType: 'publish',
      list:[]
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
    tabChange: function (key) {
      let _this = this;
      _this.tabType = key;
      _this.order.pageNo = 1;
      _this.order.parentTotalPage = 0;
      switch(key){
        case "publish":{_this.getTaskList('publish');}break;
        case "taking":{_this.getTaskList('taking');}break;
        case "orderRecords":{_this.getOrderList();}break;
      }
    },
    orderParentCallback: function(cPage) {
      let _this = this;
      _this.order.pageNo = cPage;
      _this.getOrderList();
    },
    getOrderList: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.order.pageNo);
      param.push("pageSize=" + _this.order.pageSize);
      param.push("userId=" + _this.memberId);
      
      _this.$axios
        .get("orders?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.order.parentTotalPage = res.total;
          let arr = [];
          _this.$lodash.forEach(res.list, function(item) {
            item.createDateStr = _this.$moment(item.createDate).format('YYYY/MM/DD HH:mm');
            item.payTypeName = util.getPayTypeName(item.payType);
            arr.push(item);
          });
          _this.order.list = arr;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    getTaskList: function (key) {
        let _this = this;
        _this.PUSH_LOADING();
        let param = [];
        param.push("pageNum=" + _this.order.pageNo);
        param.push("pageSize=" + _this.order.pageSize);
        param.push("userId=" + _this.memberId);
        param.push("type=" + key);
        
        _this.$axios
          .get("orders?" + param.join("&"))
          .then(result => {
            try {
                   let res = result.data;
                  _this.order.parentTotalPage = res.total;
                  let arr = [];
                  _this.$lodash.forEach(res.list, function(item) {
                    item.startDateStr = _this.$moment(item.startDate).format('YYYY/MM/DD');
                    item.endDateStr = _this.$moment(item.endDate).format('YYYY/MM/DD');

                    _this.$lodash.forEach(item.users,function(user){
                        //  头像处理
                        let httpIndex = user.headImage.indexOf('http');
                        if(httpIndex == -1){
                          user.headImage = superConst.HEAD_IMAGE_DEFAULT + itemuser.headImage;
                        }
                    });
                  
                    arr.push(item);
                  });
                  _this.list = arr;
                  _this.SHIFT_LOADING();
            } catch (error) {
                console.error(error)
            }
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
                  _this.getTaskList('publish');
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
