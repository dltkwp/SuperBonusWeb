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
                  <h3><strong>{{detail.projectName}}</strong></h3>

                  <p class="text-muted m-b-md">
                    {{detail.intoduction}}
                  </p>

                  <p><strong>数量：</strong>{{detail.projectNumber}}</p>
                  <p><strong>悬赏标价：</strong>{{detail.pricing}}</p>
                  <p><strong>赏金：</strong>{{detail.price}}</p>
                  <p><strong>有效期：</strong>{{detail.startDateStr}}～{{detail.endDateStr}}</p>
                  <p><strong>地区：</strong>{{detail.area}}</p>
                  <p><strong>目标客户：</strong>{{detail.target}}</p>
                  <p><strong>项目背景：</strong>{{detail.context}}</p>

                  <div class="user-button m-t-md">
                    <div class="row">
                      <div class="col-md-6">
                        <router-link :to="{path:'/task/v_edit',query:{taskId:taskId}}" class="btn btn-default btn-sm btn-block"><i class="fa fa-pencil"></i> 编辑项目</router-link>
                      </div>
                      <div class="col-md-6">
                        <a href="javascript:;;" v-if="detail.status!='done'" @click="showOverModal" class="btn btn-default btn-sm btn-block" ><i class="fa fa-check"></i> 项目完成</a>
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
                  <input type="text" placeholder="搜索申请人/承接人姓名 " class="input form-control" maxlength="20" v-model="queryKey">
                  <span class="input-group-btn">
                        <button type="button" @click="personRearchClick" class="btn btn btn-primary"> <i class="fa fa-search"></i> 搜索</button>
                 </span>
                </div>
                <div class="clients-list">
                  <ul class="nav nav-tabs">
                    <li class="active" @click="personTabChange('apply')"><a data-toggle="tab" href="#tab-1"><i class="fa fa-user"></i> 申请人</a></li>
                    <li class="" @click="personTabChange('undertake')"><a data-toggle="tab" href="#tab-2"><i class="fa fa-user"></i>  承接人</a></li>
                  </ul>
                  <div class="tab-content">
                    <div id="tab-1" class="tab-pane active">
                      <div class="full-height-scroll">
                        <div class="table-responsive">
                          <table class="table table-striped table-hover">
                            <tbody>
                              <tr  v-for="(item,index) in personList" :key="index">
                                <td class="client-avatar">
                                  <img alt="image" v-bind:src="item.headImage"> </td>
                                <td>
                                  <router-link :to="{path:'/member/v_detail',query:{memberId:item.userId}}">{{item.realname||item.nickname}}</router-link>
                                </td>
                                <td>{{item.enterprise}}</td>
                                <td>{{item.userPosition}}</td>
                                <td class="contact-type"><i class="fa fa-phone"> </i></td>
                                <td> {{item.phone}}</td>
                                <td class="client-status" key="待处理：wait 已承接：undertake 已拒绝：refuse 已完成：done">
                                    <span class="label label-warning"   v-if="item.status=='wait'">待处理</span>
                                    <span class="label label-primary"   v-if="item.status=='undertake'">已承接</span>
                                    <span v-if="item.status=='refuse'">已拒绝</span>
                                    <span v-if="item.status=='done'">已完成</span>
                                </td>
                                <td>{{item.introducerName ? (item.introducerName + '推荐') : ''}}</td>
                                <td> 
                                    <button class="btn btn-white btn-sm" v-if="personType=='undertake' && item.status!='done'" @click="showUserCompleteModal(index)">完成项目</button>
                                    <button class="btn btn-white btn-sm" @click="agree(index)" v-if="personType=='apply' && item.status=='wait' " >同意</button> 
                                    <button class="btn btn-white btn-sm" @click="refuse(index)"  v-if="personType=='apply' && item.status=='wait'" >拒绝</button>  
                                    <button class="btn btn-white btn-sm" @click="showStatusModal(index)" v-if="personType=='apply' && (item.status=='undertake' || item.status=='refuse') " >调整</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                            <v-empty :isShow="parentTotalPage==0"></v-empty>
                            <page :pageSize="pageSize" v-if="parentTotalPage>0" :total="parentTotalPage" show-total :current="pageNo" @on-change="parentCallback"></page>

                        </div>
                        <div class="row" v-if="personType=='undertake'">
                          <div class="col-md-6 col-md-offset-3"><div class="btn btn-primary btn-block" @click="showApplyPersionModal" >新增承接人</div></div>
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




      <!-- 项目完成弹出提示框  开始 -->
      <div id="remind-info" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">温馨提示</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-12">
                  <div class="alert alert-danger">确定该项目已经全部完成了吗？项目状态一旦变更，无法进行修改。</div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="projectOver()" class="btn btn-primary">确定</button>
              <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 项目完成弹出提示框  结束 -->

      <!-- 新增承接人 开始-->
      <div id="add-user" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">新增承接人</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="col-lg-3 control-label">搜索会员</label>
                    <div class="col-lg-8">
                      <Select
                          placeholder="请输入会员编号/姓名/手机号"
                          v-model="userId"
                          filterable
                          remote
                          @on-change="personChange"
                          :remote-method="getUsers"
                          :loading="loading">
                          <Option v-for="(option, index) in users" :value="option.id" :key="index">{{option.realname}}</Option>
                      </Select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">会员姓名</label>
                    <div class="col-lg-8">
                      <p class="form-control-static">{{user.realname||user.nickname}}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">联系电话</label>
                    <div class="col-lg-8">
                      <p class="form-control-static">{{user.username}}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">等级</label>
                    <div class="col-lg-8">
                      <p class="form-control-static">{{user.levelName}}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">企业</label>
                    <div class="col-lg-8">
                      <p class="form-control-static">{{user.enterprise}}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">职位</label>
                    <div class="col-lg-8">
                      <p class="form-control-static">{{user.userPosition}}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">推荐人</label>
                    <div class="col-lg-8">
                      <Select
                          placeholder="搜索推荐人姓名/手机号（可不填）"
                          v-model="introducer"
                          filterable
                          remote
                          :remote-method="getQueryIntroducerUsers"
                          :loading="loading">
                          <Option v-for="(option, index) in introducerUsers" :value="option.id" :key="index">{{option.realname}}</Option>
                      </Select>
                    </div>
                  </div>
                </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="setUser">保存</button>
              <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 新增承接人 结束-->

      <!--  调整状态 开始 -->
      <div id="choose-statue" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">调整状态</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-12">
                  <div class="alert alert-danger">该会员状态已选择，请谨慎调整！</div>
                  <form class="form-horizontal">
                    <div class="form-group">
                      <label class="col-lg-3 control-label">状态</label>
                      <div class="col-lg-8">
                        <label class="radio-inline">
                          <input type="radio"   name="changeStatus" v-bind:checked='bathStatus=="undertake"' v-model="bathStatus" value="undertake">同意承接 </label>
                        <label class="radio-inline">
                          <input type="checkbox" name="changeStatus" v-bind:checked='bathStatus=="refuse"'  v-model="bathStatus"  value="refuse">拒绝承接 </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="batchSave" class="btn btn-primary">保存</button>
              <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
    <!--  调整状态 结束 -->


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
import { Select, Option, Page } from "iview";

export default {
  components: {
    vMenus,
    vTop,
    vEmpty,
    Page,
    Select,
    Option
  },
  data() {
    return {
        bathStatus:'undertake',
        taskId: -1,
        queryKey: '',
        parentTotalPage: 0,
        pageNo: 1,
        pageSize:15,
        personList:[],
        personType:'apply',
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
        },
        loading:false,
        userId:'',
        introducer:'',
        curUser:'',
        users:[],
        introducerUsers:[],
        user:{},
        completeType:'project', // project - user
        userIndex:-1,
    };
  },
  mounted() {
    let _this = this;
    _this.taskId = _this.$route.query.taskId;
    _this.SHIFT_LOADING();
    _this.getDetail();
    _this.getPersons();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    personChange: function (userId){
        let _this = this;
        let findObj = _this.$lodash.find(_this.users,function(item){
          return item.id === userId;
        });
        _this.user = findObj;
    },
    batchSave: function () {
        let _this = this;
        _this.updateStatus(_this.bathStatus,function(){
            _this.$toast.success('操作成功');
             $("#choose-statue").modal('hide');
            _this.getPersons();
        });
    },
    showStatusModal: function (index) {
      let _this = this;
      _this.userIndex = index;
      _this.bathStatus = 'undertake';
      $("#choose-statue").modal('show');
    },
    showOverModal: function () {
      let _this = this;
      _this.completeType = 'project';
      $("#remind-info").modal('show');
    },
    showUserCompleteModal: function (index) {
      let _this = this;
      _this.userIndex = index;
      _this.completeType = 'user';
      $("#remind-info").modal('show');
    },
    projectOver: function () {
      let _this = this;
      console.log(_this.completeType);
      if(_this.completeType == 'project') {
        _this.PUSH_LOADING();
        _this.$axios
          .post("projects/"+_this.taskId)
          .then(result => {
            let res = result.data;
            _this.$toast.success('操作成功');
            $("#remind-info").modal('hide');
            _this.pageNo = 1;
            _this.getPersons();
            _this.SHIFT_LOADING();
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      } else if(_this.completeType == 'user') {
        let curUser = _this.personList[_this.userIndex];
        if (curUser) {
          _this.updateStatus('done',function(){
              _this.$toast.success('操作成功');
              $("#remind-info").modal('hide');
              _this.pageNo = 1;
              _this.getPersons();
          });
        }
      }
    },
    getDetail: function () {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("projects/" + _this.taskId+'?hasDesc=false')
        .then(result => {
          let res = result.data;

          // 图片处理   
          if (res.images && res.images.length>0) {
              let arr = res.images.split(',');
              let imagesArr = [];
              _this.$lodash.forEach(arr,function(code,index){
                  imagesArr.push({url:  superConst.IMAGE_STATIC_URL + code,code: code})
              })
              res.imagesList = imagesArr;
          }
          res.startDateStr = _this.$moment(res.startDate).format('YYYY/MM/DD')
          res.endDateStr = _this.$moment(res.endDate).format('YYYY/MM/DD')
          _this.detail = res;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    personRearchClick: function () {
      let _this = this;
      _this.pageNo = 1;
      _this.getPersons();
    },
    parentCallback(cPage) {
      let _this = this;
      _this.pageNo = cPage;
      _this.getPersons();
    },
    personTabChange: function (key) {
      let _this = this;
      _this.pageNo = 1;
      _this.personType = key;
      _this.getPersons();
    },
    getPersons: function () {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.pageNo);
      param.push("pageSize=" + _this.pageSize);
      param.push('type=' + _this.personType)
      if(_this.queryKey){
        param.push('name=' + _this.queryKey);
      }
      _this.$axios
        .get("projects/"+_this.taskId+"/users" + '?' + param.join('&'))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.total;
          let _data = res.list;
          _this.$lodash.forEach(_data,function(item){
            if (item.headImage) {
              let httpIndex = item.headImage.indexOf('http');
              if(httpIndex==-1){
                item.headImage = superConst.IMAGE_STATIC_URL + item.headImage
              }
            }
          })
          _this.personList = _data;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    showApplyPersionModal: function (){
      let _this = this;
      _this.userId = '';
      _this.introducer = '';
      _this.user = {};
      _this.users = [];
      _this.introducerUsers = [];
      $('#add-user').modal('show');
    },
    setUser: function () {
      let _this = this;
      if (_this.userId) {
          let _this = this;
          _this.PUSH_LOADING();
          _this.loading = true;
          let url = "projects/"+_this.taskId+"/users/"+_this.userId;
          if (_this.introducer) {
            url = url + '?introducer=' + _this.introducer;
          }
          _this.$axios
            .post(url)
            .then(result => {
              let res = result.data;
              if(res.code && res.code >=0) {
                  _this.$toast.error(res.msg);
              }else{
                _this.$toast.success('操作成功');
                $('#add-user').modal('hide');
                _this.pageNo = 1;
                _this.getPersons();
              }
              _this.SHIFT_LOADING();
              _this.loading = false;
            })
            .catch(err => {
              _this.loading = false;
              _this.SHIFT_LOADING();
            });
      }else {
        _this.$toast.warning('请选择承接人');
      }
    },
    usersChange: function () {
      let _this = this;
      let curUser = _this.$lodash.find(users,function(item){
        return item.id == _this.userId;
      });
      _this.curUser = curUser;
    },
    getQueryIntroducerUsers: function (queryKey) {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + 1);
      param.push("pageSize=" + 5);
      param.push('queryKey=' + queryKey);
      _this.loading = true;
      _this.$axios
        .get("users?" + param.join('&'))
        .then(result => {
          let res = result.data;
          let arr = [];
          _this.$lodash.forEach(res.list,function(item){
            item.realname =  item.realname||item.nickname;
            let headImageIndex = item.headImage.indexOf('http');
            if(headImageIndex==-1){
              item.headImage = superConst.IMAGE_STATIC_URL + item.headImage;
            }
            arr.push(item);
          });
          _this.introducerUsers = arr;
          _this.SHIFT_LOADING();
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
          _this.SHIFT_LOADING();
        });
    },
    getUsers: function (queryKey) {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + 1);
      param.push("pageSize=" + 5);
      param.push('queryKey=' + queryKey);
      _this.loading = true;
      _this.$axios
        .get("users?" + param.join('&'))
        .then(result => {
          let res = result.data;
          let arr = [];
          _this.$lodash.forEach(res.list,function(item){
            item.realname =  item.realname||item.nickname;
            let headImageIndex = item.headImage.indexOf('http');
            if(headImageIndex==-1){
              item.headImage = superConst.IMAGE_STATIC_URL + item.headImage;
            }
            arr.push(item);
          });
          _this.users = arr;
          _this.SHIFT_LOADING();
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
          _this.SHIFT_LOADING();
        });
    },
    showUserCompleteProject: function (index) {
      _this.userIndex = index;
      _this.completeType = 'user';
      $("#remind-info").modal('show');
    },
    refuse: function (index) {
        let _this = this;
        _this.userIndex = index;
        _this.updateStatus('refuse',function(){
            _this.$toast.success('操作成功');
            _this.getPersons();
        });
    },
    agree: function (index) {
      let _this = this;
      _this.userIndex = index;
	  _this.PUSH_LOADING();
      _this.loading = true;
      let curUser = _this.personList[_this.userIndex];
      _this.$axios
        .post("projects/"+_this.taskId+'/users/' + curUser.userId + '/status?status=undertake')
        .then(result => {
          let res = result.data;
          if(res.code && res.code >=0) {
              _this.$toast.error(res.msg);
          }else{
            callback && callback();
          }
          _this.SHIFT_LOADING();
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
          _this.SHIFT_LOADING();
        });
    },
    updateStatus: function (status,callback) {
      let _this = this;
      _this.PUSH_LOADING();
      _this.loading = true;
      let curUser = _this.personList[_this.userIndex];
      _this.$axios
        .post("projects/"+_this.taskId+'/users/' + curUser.userId + '?status=' + status)
        .then(result => {
          let res = result.data;
          if(res.code && res.code >=0) {
              _this.$toast.error(res.msg);
          }else{
            callback && callback();
          }
          _this.SHIFT_LOADING();
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
          _this.SHIFT_LOADING();
        });
    },
  }
};
</script>

<style>

</style>
