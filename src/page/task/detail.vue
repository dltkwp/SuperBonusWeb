<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
           <div class="row">

          <div class="col-md-4">
            <div class="ibox float-e-margins">
              <div class="ibox-title">
                <h5>项目信息</h5>
              </div>
              <div>
                <div class="ibox-content no-padding border-left-right">
                  <img  class="img-responsive" v-bind:src="item.url" v-for="(item,index) in detail.imagesList" :key='index' v-if="index==0">
                </div>
                <div class="ibox-content profile-content">
                  <h3><strong>{{detail.project_name}}</strong></h3>

                  <p class="text-muted m-b-md">
                    {{detail.intoduction}}
                  </p>

                  <p><strong>数量：</strong>{{detail.project_number}}</p>
                  <p><strong>赏金：</strong>¥{{detail.price}}</p>
                  <p><strong>有效期：</strong>{{detail.startDateStr}}～detail.endDateStr</p>
                  <p><strong>地区：</strong>{{detail.area}}</p>
                  <p><strong>目标客户：</strong>{{detail.target}}</p>
                  <p><strong>项目背景：</strong>{{detail.content}}</p>

                  <div class="user-button m-t-md">
                    <div class="row">
                      <div class="col-md-6">
                        <a type="button" class="btn btn-default btn-sm btn-block" href="add-task.html"><i class="fa fa-pencil"></i> 编辑项目</a>
                      </div>
                      <div class="col-md-6">
                        <a  class="btn btn-default btn-sm btn-block"  data-toggle="modal" href="#remind-info"><i class="fa fa-check"></i> 项目完成</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="ibox">
              <div class="ibox-content">

                <h2>承接信息</h2>
                <p>
                  您可以选择指定申请人承接该项目
                </p>
                <div class="input-group">
                  <input type="text" placeholder="搜索申请人/承接人姓名 " class="input form-control">
                  <span class="input-group-btn">
                        <button type="button" class="btn btn btn-primary"> <i class="fa fa-search"></i> 搜索</button>
                 </span>
                </div>
                <div class="clients-list">
                  <ul class="nav nav-tabs">
                    <span class="pull-right small text-muted">1406人申请</span>
                    <li class="active"><a data-toggle="tab" href="#tab-1"><i class="fa fa-user"></i> 申请人</a></li>
                    <li class=""><a data-toggle="tab" href="#tab-2"><i class="fa fa-user"></i>  承接人</a></li>
                  </ul>
                  <div class="tab-content">
                    <div id="tab-1" class="tab-pane active">
                      <div class="full-height-scroll">
                        <div class="table-responsive">
                          <table class="table table-striped table-hover">
                            <tbody>

                              <tr>
                                <td class="client-avatar"><img alt="image" src="img/a4.jpg"> </td>
                                <td><a href="member-detail.html" class="client-link">张三</a></td>

                                <td>大连乐维科技有限公司</td>
                                <td>经理</td>
                                <td class="contact-type"><i class="fa fa-phone"> </i></td>
                                <td> 15242612898</td>
                                <td class="client-status"><span class="label label-warning">待处理</span></td>
                                <td> <button class="btn btn-white btn-sm" >同意</button> <button class="btn btn-white btn-sm" >拒绝</button>  </td>
                              </tr>

                              <tr>
                                <td class="client-avatar"><img alt="image" src="img/a4.jpg"> </td>
                                <td><a href="member-detail.html" class="client-link">张三</a></td>

                                <td>大连乐维科技有限公司</td>
                                <td>经理</td>
                                <td class="contact-type"><i class="fa fa-phone"> </i></td>
                                <td> 15242612898</td>
                                <td class="client-status">已拒绝</td>
                              <td> <button class="btn btn-white btn-sm" data-toggle="modal" href="#choose-statu" >调整</button>   </td>
                              </tr>
                              <tr>
                                <td class="client-avatar"><img alt="image" src="img/a4.jpg"> </td>
                                <td><a href="member-detail.html" class="client-link">张三</a></td>
                                <td>大连乐维科技有限公司</td>
                                <td>经理</td>
                                <td class="contact-type"><i class="fa fa-phone"> </i></td>
                                <td> 15242612898</td>
                                <td class="client-status"><span class="label label-primary">已承接</span></td>
                                <td> <button class="btn btn-white btn-sm" data-toggle="modal" href="#choose-statu" >调整</button>   </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id="tab-2" class="tab-pane">
                      <div class="full-height-scroll">
                        <div class="table-responsive">
                          <table class="table table-striped table-hover">
                            <tbody>
                              <tr>
                                <td class="client-avatar"><img alt="image" src="img/a4.jpg"> </td>
                                <td><a href="member-detail.html" class="client-link">张三</a></td>
                                <td>大连乐维科技有限公司</td>
                                <td>经理</td>
                                <td class="contact-type"><i class="fa fa-phone"> </i></td>
                                <td> 15242612898</td>
                                <td class="client-status"><span class="label label-primary">已承接</span></td>
                                <td>  <button class="btn btn-white btn-sm" data-toggle="modal" href="#edit-task" >完成项目</button>   </td>
                              </tr>
                              <tr>
                                <td class="client-avatar"><img alt="image" src="img/a4.jpg"> </td>
                                <td><a href="member-detail.html" class="client-link">张三</a></td>
                                <td>大连乐维科技有限公司</td>
                                <td>经理</td>
                                <td class="contact-type"><i class="fa fa-phone"> </i></td>
                                <td> 15242612898</td>
                                <td class="client-status">已完成</td>
                                <td>  </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="row">
                          <div class="col-md-6 col-md-offset-3"><div class="btn btn-primary btn-block" data-toggle="modal" href="#add-user">新增承接人</div></div>
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
import superConst from "../../util/super-const";
import regex from "../../util/regex";

export default {
  components: {
    vMenus,
    vTop,
    vFoot
  },
  data() {
    return {
        taskId: -1,
        detail: {
          project_no:'',  //  项目编号
          project_name:'',   //  标题
          intoduction: "", //  简介
          imagesList:[],  //  图片列表
          project_number:'',     //  产品数量
          price:'',   //  赏金
          area:'',    //地区
          target:'',//   目标客户
          context:'',      //  项目背景
          description: "", //  详细介绍
          start_date:'',   // 开始日期
          end_date:'',     // 结束日期
        }
    };
  },
  mounted() {
    let _this = this;
    _this.taskId = _this.$route.query.taskId;
    _this.SHIFT_LOADING();
    // _this.getDetail();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    getDetail: function () {
        let _this = this;
        _this.PUSH_LOADING();
        _this.$axios
          .get("tasks/" + _this.taskId)
          .then(result => {
            let res = result.data;

            // 图片处理   
            if (res.images && res.images.length>0) {
                let arr = res.images.split(',')
                _this.$lodash.forEach(arr,function(code,index){
                    _this.detail.imagesList[index] = {
                        url:  superConst.IMAGE_STATIC_URL + code,
                        code: code
                    }
                })
            }
            _this.SHIFT_LOADING();
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
    },
  }
};
</script>

<style>

</style>
