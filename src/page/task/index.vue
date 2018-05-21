<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
             <div class="row">
          <div class="col-lg-12">
            <div class="ibox">
              <div class="ibox-title">项目列表</div>
              <div class="ibox-content">
                <div class="row m-b-sm ">
                  <div class="col-lg-12">
                  <div class="pull-left">

                    <router-link to="/task/v_save" class="btn btn-primary btn-sm">新增项目</router-link>
                    
                    <div class="btn-group btn-group-sm">
                        <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false">批量操作 <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li ><a  href="javascript:;;" @click="showBathDelConfirmModal">删除</a></li>
                        </ul>
                    </div>
                  </div>
                  <div class=" pull-right text-right">
                    <div class="btn-group btn-group-sm">
                      <button data-toggle="dropdown" class="btn btn-white dropdown-toggle" aria-expanded="false">{{curStatus.name}} <span class="caret"></span></button>
                      <ul class="dropdown-menu">
                        <li><a href="javascript:;;" @click="statusItemClick(index)" v-for="(item,index) in statusList" :key="index">{{item.name}}</a></li>
                      </ul>
                    </div>
                    <div class="search-box">
                      <div class="input-group">
                        <input type="text" placeholder="搜索项目编号/名称/发布人/承接人" class="input-sm form-control" maxlength="20" v-model="queryKey">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-sm btn-primary" @click="advRearchBtnClick"> 搜索</button>
                        </span>
                      </div>
                    </div>
                    <div class="btn btn-white btn-sm" @click="showAdvModal">高级搜索</div>
                  </div>
                </div>
                </div>

                <div class="project-list m-t">
                  <table class="table table-hover text-center table-bordered">
                    <thead>
                      <tr>
                            <th class="text-center">
                                <input type="checkbox"  class="i-checks" name="inputCheckAll" v-bind:checked="checkAll" @click="checkAllClick">  
                            </th>
                            <th class="text-center">编号</th>
                            <th  class="text-center">项目</th>
                            <th  class="text-center">数量</th>
                            <th class="text-center">悬赏标价</th>
                            <th  class="text-center">赏金</th>
                            <th  class="text-center">承接人</th>
                            <th  class="text-center">状态</th>
                            <th  class="text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in taskList" :key="index">
                        <td>
                            <input type="checkbox"   class="i-checks" v-bind:checked="taskIds.indexOf(item.id)>=0" @click="itemClick($event,index)" data-index='index'>
                        </td>
                        <td>{{item.projectNo}}</td>
                        <td class="project-title text-left">
                          <img class="img-md pull-left"  v-bind:src='item.imageUrl' v-if="item.imageUrl">
                          <div class="pull-left m-l-sm">
                            <a href="javascript:;;" v-if="item.startDate&&item.endDate">
                                {{item.projectName}}<br>
                                有效期：{{item.startDateStr}}～{{item.endDateStr}}
                            </a>
                            <a href="javascript:;;" v-if="!item.startDate&&!item.endDate">
                                {{item.projectName}}<br>
                            </a>
                          </div>
                        </td>
                        <td>{{item.projectNumber}}</td>
                        <td>{{item.pricing}}</td>
                        <td>{{item.price}}</td>
                        <td >
                            <router-link :to="{path:'/member/v_detail',query:{memberId:user.id}}" v-if="uindex<=5" v-for="(user,uindex) in item.users" :key="uindex">
                              <img class="img-circle img-sm" v-bind:title="user.realname||user.nickname" v-bind:src="user.headImage">
                            </router-link>
                            <img v-if="item.users.length>=6" class="img-circle img-sm" src="https://bonus.oss-cn-beijing.aliyuncs.com/product/4F4251432490448499239C8CFBDDC62A">
                        </td>
                        <td class="project-status">
                          <span class="label label-danger"  v-if="item.status=='wait'">待审核</span>
                          <span class="label label-danger"  v-if="item.status=='onCall'">待承接</span>
                          <span class="label label-warning" v-if="item.status=='undertake'">已承接</span>
                          <span class="label label-primary" v-if="item.status=='done'">已完成</span>
                        </td>
                        <td>
                          <router-link :to="{path:'/task/v_detail',query:{taskId:item.id}}" v-if="item.status=='undertake'||item.status=='done'">查看</router-link>
                          <router-link :to="{path:'/task/v_detail',query:{taskId:item.id}}" v-if="item.status=='onCall'"  class="btn btn-primary btn-sm">待处理</router-link>
                          <router-link :to="{path:'/task/v_edit',query:{taskId:item.id}}" v-if="item.status=='wait'"  class="btn btn-primary btn-sm">审核</router-link>
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
                <div class="alert alert-danger">确定要删除吗？</div>
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
    <!-- 高级检索 开始 -->
    <div id="advSearchModal" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">高级搜索</h4>
            </div>
            <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                <form class="form-horizontal">
                    <div class="form-group">
                    <label class="col-lg-3 control-label">有效期</label>
                    <div class="col-lg-8">
                      <date-picker :editable="false" :clearable="true"  :value="datePicker" format="yyyy/MM/dd" type="daterange" placement="bottom-end" 
                            @on-change="handleChange" placeholder="选择有效期" style="width: 200px"></date-picker>                        
                    </div>

                    </div>
                    <div class="form-group">
                    <label class="col-lg-3 control-label">地区</label>
                    <div class="col-lg-8">
                        <label class="checkbox-inline" v-for="(item,index) in areaList" :key='index'>
                        <input type="checkbox" v-bind:checked="areaArr.indexOf(item.key)>=0"  name="inputAreaAdvRearch" @click="advAreaItemClick($event,index)">{{item.name}}</label>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="advRearchClick">搜索</button>
            <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
            </div>
        </div>
        </div>
    </div>
    <!-- 高级检索 结束 -->

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

import { DatePicker,Page } from "iview";


export default {
  components: {
    vMenus,
    vTop,
    vEmpty,
    DatePicker,
    Page
  },
  data() {
    return {
      datePicker: ["", ""],
      parentTotalPage: 0,
      pageNo: 1,
      pageSize:15,
      taskIds: [], //  当前页面选择的id集合
      taskList: [], // 页面的数据集合
      checkAll: false, // 页面顶部全部选择的状态
      queryKey: "", // 关键字检索
      status: "", // 项目状态
      statusList:[], // 高级检索的集合
      curStatus:{key:'',name:'全部项目'}, // 当前选择的状态
      areaList:[],  // 数据库查询出来的集合
      areaArr: [], // 已经选择的的区域，不能包含 all 的关键字
    };
  },
  mounted() {
    let _this = this;
    _this.SHIFT_LOADING();
    _this.initStatusList();
    _this.list();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    advAreaItemClick: function (event,index){
      let _this = this;
      let cur = _this.areaList[index];
      if(cur.key == 'all') {
        if(event.target.checked){
         _this.areaArr = _this.$lodash.map(_this.areaList,'key');
        }else{
          _this.areaArr = [];
        }
      }else{
        let _index = _this.areaArr.indexOf(cur.key);
        if(event.target.checked){
          if (_index==-1){
              _this.areaArr.push(cur.key);
          }
        }else{
          if (_index>=0){
              _this.areaArr.splice(_index,1);
              let allIndex = _this.areaArr.indexOf('all');
              if(allIndex>=0) {
                _this.areaArr.splice(allIndex,1);
              }
          }
        }
      }
    },
    handleChange(date) {
      let _this = this;
      _this.datePicker = date;
    },
    statusItemClick: function (index) {
        let _this = this;
        _this.curStatus = _this.statusList[index];
        _this.pageNo = 1;
        _this.list();
    },
    showAdvModal: function() {
      let _this = this;
      $("#advSearchModal").modal("show");
      _this.getAreaList();
    },
    advRearchClick: function () {
      let _this = this;
      _this.parentCallback(1);
      $("#advSearchModal").modal("hide");
    },
    batchDeleteSubmit: function() {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .delete("projects?projectIds=" + _this.taskIds.join(","))
        .then(result => {
          let res = result.data;
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.taskIds = [];
            _this.checkAll = false;
            _this.$toast.success("操作成功");
            $("#deleteConfirmMdoal").modal("hide");
            _this.list();
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    showBathDelConfirmModal: function() {
      let _this = this;
      if (_this.taskIds.length === 0) {
        _this.$toast.warning("请选择要操作的项");
        return false;
      }
      $("#deleteConfirmMdoal").modal("show");
    },
    parentCallback(cPage) {
      let _this = this;
      _this.productIds = [];
      _this.checkAll = false;
      _this.pageNo = cPage;
      _this.list();
    },
    list: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.pageNo);
      param.push("pageSize=" + _this.pageSize);
      if (!_this.$lodash.isEmpty(_this.queryKey)) {
        param.push("queryKey=" + _this.queryKey);
      }
      if (_this.curStatus && _this.curStatus.key != "") {
        param.push("status=" + _this.curStatus.key);
      }
      if(_this.datePicker[0] + _this.datePicker[1]) {
        param.push('startDate=' + _this.$moment(_this.datePicker[0]).valueOf());
        param.push('endDate=' + _this.$moment(_this.datePicker[1]).valueOf());
      }
      if(_this.areaArr.length>0 && _this.areaArr.indexOf('all')==-1){
          param.push('areas=' + _this.areaArr.join(','));
      }

      _this.$axios
        .get("projects?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.total;
          try {
            _this.$lodash.forEach(res.list, function(item) {
              item.startDateStr = _this.$moment(item.startDate).format('YYYY/MM/DD');
              item.endDateStr = _this.$moment(item.endDate).format('YYYY/MM/DD');

              if (item.images) {
                let imagesArr = item.images.split(",");
                if (imagesArr.length > 0) {
                  item.imageUrl = superConst.IMAGE_STATIC_URL + imagesArr[0];
                } else {
                  item.imageUrl = ""; // 产品默认图片
                }
              } else {
                item.imageUrl = ""; // 产品默认图片
              }

              if(item.users&&item.users.length>0){
                _this.$lodash.forEach(item.users,function(user){
                    let headImageIndex = user.headImage.indexOf('http');
                    if(headImageIndex==-1){
                      user.headImage = superConst.IMAGE_STATIC_URL + user.headImage;
                    }
                })
              }


            });
          } catch (e) {
            console.error(e);
          }
          _this.taskList = res.list;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    checkAllClick: function(event) {
      let _this = this;
      if (event.target.checked) {
        _this.taskIds = _this.$lodash.map(_this.taskList, "id");
        _this.checkAll = true;
      } else {
        _this.taskIds = [];
        _this.checkAll = false;
      }
    },
    itemClick: function(event, index) {
      let _this = this;
      let cur = _this.taskList[index];
      let containIndex = _this.taskIds.indexOf(cur.id);
      if (event.target.checked) {
        if (containIndex == -1) {
          _this.taskIds.push(cur.id);
        }
        _this.checkAll = _this.taskIds.length == _this.taskList.length;
      } else {
        if (containIndex >= 0) {
          _this.taskIds.splice(containIndex, 1);
        }
        _this.checkAll = false;
      }
    },
    //  高级检索click事件
    advRearchBtnClick: function() {
      let _this = this;
      _this.parentCallback(1);
    },
    // 初始化项目状态
    initStatusList: function () {
        let _this = this;
        let arr = [];
        arr.push({key:'',name:'全部项目'});
        arr.push({key:'wait',name:'待审核'});
        arr.push({key:'onCall',name:'待承接'});
        arr.push({key:'undertake',name:'已承接'});
        arr.push({key:'done',name:'已完成'});
        _this.statusList = arr;
    },
    getAreaList: function () {
        let _this = this;
        _this.PUSH_LOADING();
        _this.$axios
        .get("area")
        .then(result => {
          let res = result.data;
          try {
            let arr = [];
            arr.push({key:'all',name:'全部'})
            _this.$lodash.forEach(res, function(item) {
              let key = item.area;
              arr.push({key: key ,name: key})
            });
            _this.areaList = arr;
          } catch (e) {
            console.error(e);
          }
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
