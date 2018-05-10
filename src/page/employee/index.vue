<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
         <div class="row">
          <div class="col-lg-12">
            <div class="ibox">
              <div class="ibox-title">员工列表</div>
              <div class="ibox-content">
                <div class="row m-b-sm ">
                  <div class="col-lg-12">
                    <div class="pull-left">
                      <a class="btn btn-primary btn-sm" @click="showSaveModal">新增员工</a>
                    </div>
                    <div class=" pull-right text-right">
                      <div class="search-box">
                        <div class="input-group">
                          <input type="text" placeholder="搜索员工姓名或电话" class="input-sm form-control" maxlength="20" v-model="queryKey">
                          <span class="input-group-btn">
                            <button type="button" class="btn btn-sm btn-primary" @click="searchClick"> 搜索</button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="table table-bordered table-stripped table-hover">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> 编号</th>
                        <th> 员工姓名 </th>
                        <th> 手机号 </th>
                        <th> 权限名称 </th>
                        <th>职位 </th>
                        <th>状态 </th>
                        <th> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                          <td>001</td>
                        <td>
                          <img class="img-sm img-circle" src="img/gallery/2.jpg"> 张三
                        </td>
                        <td> 152126128988</td>
                        <td>客服权限</td>
                        <td>客服</td>
                        <td>正常</td>
                        <td>
                          <a class="btn btn-white btn-sm" data-toggle="modal" href="#worker-set">编辑</a>
                          <a class="btn btn-white btn-sm" data-toggle="modal" href="#stop-set">停用</a>
                          <a class="btn btn-white btn-sm" data-toggle="modal" href="#delete-set">删除</a>
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                          <td>002</td>
                        <td>
                          <img class="img-sm img-circle" src="img/gallery/1.jpg"> 李四

                        </td>

                        <td> 152126128988</td>
                        <td>客服权限</td>
                        <td>客服</td>
                        <td>停用</td>


                        <td>
                          <a class="btn btn-white btn-sm" data-toggle="modal" href="#worker-set">编辑</a>
                          <a class="btn btn-white btn-sm" data-toggle="modal" href="#stop-set">启用</a>
                          <a class="btn btn-white btn-sm" data-toggle="modal" href="#delete-set">删除</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <v-empty :isShow="parentTotalPage==0"></v-empty>
                  <page :pageSize="pagePageSize"  v-if="parentTotalPage>0"  :total="parentTotalPage" show-total :current="pageNo" @on-change="parentCallback"></page>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    <!-- 新增员工弹出层 开始 -->
        <div id="add-worker" class="modal fade" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">新增员工</h4>
                </div>
                <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                    <form class="form-horizontal">
                        <div class="form-group">
                        <label class="col-lg-3 control-label">员工姓名</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入员工姓名" class="form-control">
                        </div>
                        </div>
                        <div class="form-group">
                                <label class="col-sm-3 control-label">照片:</label>
                                <div class="col-sm-9">
                                <div class="img-upload">

                                </div>
                                    <div class="btn-delete"><i class="fa fa-times-circle"></i></div>
                                </div>
                            </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">手机号</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入手机号" class="form-control">
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">权限</label>
                        <div class="col-lg-8">
                            <select class="form-control">
                            <option></option>

                            <option>客服</option>
                                <option>总监</option>
                            </select>
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">职位</label>
                        <div class="col-lg-8">
                            <select class="form-control">
                            <option></option>
                            <option>客服</option>
                                <option>总监</option>
                            </select>
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">初始登录密码</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入初始登录密码" class="form-control">
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div class="modal-footer">

                <button type="button" class="btn btn-primary">保存</button>
                <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
                </div>
            </div>
            </div>
        </div>
        <div id="worker-set" class="modal fade" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">编辑资料</h4>
                </div>
                <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                    <form class="form-horizontal">
                        <div class="form-group">
                        <label class="col-lg-3 control-label">员工姓名</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入员工姓名" class="form-control">
                        </div>

                        </div>
                        <div class="form-group">
                                <label class="col-sm-3 control-label">照片:</label>
                                <div class="col-sm-9">
                                <div class="img-upload">
                                    <div class="btn-delete"><i class="fa fa-times-circle"></i></div>
                                </div>

                                </div>
                            </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">手机号</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入手机号" class="form-control">
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">权限</label>
                        <div class="col-lg-8">
                            <select class="form-control">
                            <option></option>

                            <option>客服</option>
                                <option>总监</option>
                            </select>
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">职位</label>
                        <div class="col-lg-8">
                            <select class="form-control">
                            <option></option>
                            <option>客服</option>
                                <option>总监</option>
                            </select>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                <button class="btn btn-white pull-left" data-toggle="modal" href="#pwd-set">修改密码</button>
                <button type="button" class="btn btn-primary">保存</button>
                <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
                </div>
            </div>
            </div>
        </div>
        <div id="pwd-set" class="modal fade" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">修改密码</h4>
                </div>
                <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                    <form class="form-horizontal">
                        <div class="form-group">
                        <label class="col-lg-3 control-label">新密码</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入新密码" class="form-control">
                        </div>

                        </div>

                        <div class="form-group">
                        <label class="col-lg-3 control-label">再次输入</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请再次输入新密码" class="form-control">
                        </div>
                        </div>

                    </form>
                    </div>
                </div>
                </div>
                <div class="modal-footer">

                <button type="button" class="btn btn-primary">保存</button>
                <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
                </div>
            </div>
            </div>
        </div>
        <div id="stop-set" class="modal fade" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">温馨提示</h4>
                </div>
                <div class="modal-body">
                <div class="alert alert-danger">
                                        确定停用员工吗？停用后，员工将无法登录。
                                    </div>
                </div>
                <div class="modal-footer">

                <button type="button" class="btn btn-primary">确定</button>
                <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
                </div>
            </div>
            </div>
        </div>
        <div id="delete-set" class="modal fade" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">温馨提示</h4>
                </div>
                <div class="modal-body">
                <div class="alert alert-danger">
                                        确定删除员工吗？
                                    </div>
                </div>
                <div class="modal-footer">

                <button type="button" class="btn btn-primary">确定</button>
                <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
                </div>
            </div>
            </div>
        </div>
    <!-- 新增员工弹出层 结束 -->

   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import vEmpty from "@/components/empty/empty.vue";
import { Page } from 'iview'

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
      parentTotalPage: 0,
      pageNo: 1,
      pageSize: 15,
      queryKey: "",
      employeeList: []
    };
  },
  mounted() {
    let _this = this;

    _this.list();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),

    list: function() {
      let _this = this;
      return false; // 尬码
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.pageNo);
      param.push("pageSize=" + _this.pageSize);
      if (!_this.$lodash.isEmpty(_this.queryKey)) {
        param.push("queryKey=" + _this.queryKey);
      }
      _this.$axios
        .get("employee?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.total;
          try {
            _this.$lodash.forEach(res.list, function(item) {
              if (item.images) {
                let imagesArr = item.images.split(",");
                if (imagesArr.length > 0) {
                  item.imageUrl = superConst.IMAGE_STATIC_URL + imagesArr[0];
                } else {
                  item.imageUrl = "";
                }
              } else {
                item.imageUrl = "";
              }
            });
          } catch (e) {
            console.error(e);
          }
          _this.employeeList = res.list;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    parentCallback(cPage) {
      let _this = this;
      _this.pageNo = cPage;
      _this.list();
    },
    searchClick: function() {
      let _this = this;
      _this.pageNo = 1;
      _this.list();
    },
    showSaveModal: function() {
      // 设置初始变量
      $("#add-worker").modal("show");
    }
  }
};
</script>

<style>

</style>
