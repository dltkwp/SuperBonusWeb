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
                        <li><a href="javascript:;;" @click="statusItemClick($event,index)" v-for="(item,index) in statusList" :key="index">{{item.name}}</a></li>
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
                            <th  class="text-center">赏金</th>
                            <th  class="text-center">承接人</th>
                            <th  class="text-center">状态</th>
                            <th  class="text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in taskList" :key="index">
                        <td>
                            <input type="checkbox"   class="i-checks" v-bind:checked="taskIds.indexOf(item.id)>=0" @click="itemClick" data-index='index'>
                        </td>
                        <td>1</td>
                        <td class="project-title text-left"><img class="img-md pull-left" src="img/gallery/2.jpg">
                          <div class="pull-left m-l-sm">
                            <a href="member-detail.html">天津户口对外推送 <br>
                                有效期：2018/04/01～2018/05/01
                            </a>
                          </div>
                        </td>
                        <td>
                          5
                        </td>
                        <td>
                            ¥1000
                        </td>
                        <td >
                          <a href="member-detail.html"><img alt="image" class="img-circle img-sm" title="用户1" src="img/a3.jpg"></a>
                          <a href="member-detail.html"><img alt="image" class="img-circle img-sm" title="用户1" src="img/a1.jpg"></a>
                          <a href="member-detail.html"><img alt="image" class="img-circle img-sm" title="用户1" src="img/a2.jpg"></a>
                          <a href="member-detail.html"><img alt="image" class="img-circle img-sm" title="用户1" src="img/a4.jpg"></a>
                          <a href="member-detail.html"><img alt="image" class="img-circle img-sm"  title="用户1" src="img/a5.jpg"></a>
                        </td>
                        <td class="project-status">
                          <span class="label label-primary">已完成</span>
                        </td>
                        <td>
                          <a href="task-detail.html" class="btn btn-white btn-sm">查看 </a>
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
                      <date-picker :value="datePicker" format="yyyy/MM/dd" type="daterange" placement="bottom-end" 
                            @on-change="handleChange" placeholder="选择有效期" style="width: 200px"></date-picker>                        
                    </div>

                    </div>
                    <div class="form-group">
                    <label class="col-lg-3 control-label">地区</label>
                    <div class="col-lg-8">
                        <label class="checkbox-inline" v-for="(item,index) in areaList" :key='index'>
                        <input type="checkbox"  name="inputAreaAdvRearch" @click="advAreaItemClick(index)">{{item.name}}</label>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-primary">搜索</button>
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
import vFoot from "@/components/foot/foot.vue";
import vEmpty from "@/components/empty/empty.vue";
import pagination from "@/components/pagination/pagination.vue";

import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util";
import { DatePicker } from "iview";


export default {
  components: {
    vMenus,
    vTop,
    vFoot,
    vEmpty,
    DatePicker,
    pagination
  },
  data() {
    return {
      datePicker: ["", ""],
      parentTotalPage: 0,
      parentCurrentpage: 1,
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
    _this.initStatusList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    advAreaItemClick: function (event,index){
      let _this = this;
      let cur = _this.areaList[index];
      if(cur.key == 'all') {
        if(event.target.checked){
          _this.areaArr = _this.$lodash.map(_this.areaList,function(item){
          return item!='all'
        });
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
          if (_index>0){
            _this.areaArr.splice(_index,1);
          }
        }
      }
      _this.parentCallback(1);
    },
    handleChange(date) {
      let _this = this;
      _this.datePicker = date;
    },
    statusItemClick: function (index) {
        let _this = this;
        _this.curStatus = _this.statusList[index];
        _this.parentCurrentpage = 1;
        _this.list();
    },
    showAdvModal: function() {
      $("#advSearchModal").modal("show");
    },
    batchDeleteSubmit: function() {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .delete("tasks?taskIds=" + _this.taskIds.join(","))
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
      _this.parentCurrentpage = cPage;
      _this.list();
    },
    list: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.parentCurrentpage);
      param.push("pageSize=" + 15);
      if (!_this.$lodash.isEmpty(_this.queryKey)) {
        param.push("queryKey=" + _this.queryKey);
      }
      if (_this.curStatus && _this.curStatus.key != "") {
        param.push("status=" + _this.curStatus.key);
      }
      if(_this.datePicker[0] + _this.datePicker[1]) {
        param.push('start_date=' + _this.datePicker[0]);
        param.push('end_date=' + _this.datePicker[1]);
      }
      if(_this.areaArr.length>0){
          param.push('area=' + _this.areaArr.join(','));
      }

      _this.$axios
        .get("taskIds?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.pages;
          try {
            _this.$lodash.forEach(res.list, function(item) {
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
        arr.push({key:'dsh',name:'待审核'});
        arr.push({key:'dcj',name:'待承接'});
        arr.push({key:'ycj',name:'已承接'});
        arr.push({key:'ywc',name:'已完成'});
        _this.statusList = arr;
    },
    getAreaList: function () {
        _this.PUSH_LOADING();
        _this.$axios
        .get("task/area")
        .then(result => {
          let res = result.data;
          try {
            let arr = [];
            arr.push({key:'all',name:'全部'})
            _this.$lodash.forEach(res, function(key) {
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
