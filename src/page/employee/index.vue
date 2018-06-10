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
                      <a v-permission="{code:'employee_insert'}" class="btn btn-primary btn-sm" @click="showSaveModal">新增员工</a>
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
                      <tr v-for="(item,index) in employeeList" :key="index">
                        <td>{{index + 1}}</td>
                          <td>{{('000' + item.id).substr(-3)}}</td>
                        <td>
                          <img class="img-sm img-circle" v-if="item.imageUrl"  v-bind:src="item.imageUrl"> {{item.realname}}
                        </td>
                        <td> {{item.username}}</td>
                        <td>{{item.roleName}}</td>
                        <td>{{item.positionName}}</td>
                        <td>{{item.statusName}}</td>
                        <td>
                          <a  v-permission="{code:'employee_update'}"  class="btn btn-white btn-sm"  @click="showEditModal(index)"   href="javascript:;;">编辑</a>
                          <a  v-permission="{code:'employee_update'}"   class="btn btn-white btn-sm"  @click="showStatusConfirm(index)"   href="javascript:;;">{{item.status=="use"?"停用":"启用"}}</a>
                          <a  v-permission="{code:'employee_delete'}"   class="btn btn-white btn-sm"  href="javascript:;;" @click="showDeleteConfirm(index)">删除</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <v-empty :isShow="parentTotalPage==0"></v-empty>
                  <page :pageSize="pageSize"  v-if="parentTotalPage>0"  :total="parentTotalPage" show-total :current="pageNo" @on-change="parentCallback"></page>
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
                            <input type="text" placeholder="请输入员工姓名" class="form-control" maxlength="20" v-model="save.realname">
                        </div>
                        </div>
                        <div class="form-group">
                              <label class="col-sm-3 control-label">照片:</label>
                              <div class="col-sm-9">
                                <div class="img-upload" @click="uploadImage">
                                  <img v-bind:src='headImageUrl' v-if="headImageUrl" style="width: 90px; height: 90px;">
                                </div>
                              </div>
                            </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">手机号</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入手机号" class="form-control" maxlength="11" v-model="save.username">
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">权限</label>
                        <div class="col-lg-8">
                            <select class="form-control" v-model="save.roleId">
                              <option  v-for="(p,index) in permissionList" v-bind:value='p.id' :key="index">
                                  {{p.name}}
                              </option>
                            </select>
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">职位</label>
                        <div class="col-lg-8">
                            <select class="form-control" v-model="save.positionId">
                              <option  v-for="(p,index) in positionList" v-bind:value='p.id' :key="index">
                                  {{p.name}}
                              </option>
                            </select>
                        </div>
                        </div>
                        <div class="form-group" v-if="optType=='save'">
                          <label class="col-lg-3 control-label">初始登录密码</label>
                          <div class="col-lg-8">
                              <input type="text" placeholder="请输入初始登录密码" class="form-control" maxlength="20" v-model="save.password">
                          </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-white pull-left" v-if="optType=='edit'" @click="showUpdatePasswordModal">修改密码</button>
                  <button type="button" class="btn btn-primary" @click="saveSubmit">保存</button>
                  <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
                </div>
            </div>
            </div>
        </div>
        <div id="edit-worker" class="modal fade" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">编辑员工</h4>
                </div>
                <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                    <form class="form-horizontal">
                        <div class="form-group">
                        <label class="col-lg-3 control-label">员工姓名</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入员工姓名" class="form-control" maxlength="20" v-model="detail.realname">
                        </div>
                        </div>
                        <div class="form-group">
                              <label class="col-sm-3 control-label">照片:</label>
                              <div class="col-sm-9">
                                <div class="img-upload" @click="uploadImage">
                                  <img v-bind:src='headImageUrl' v-if="headImageUrl" style="width: 90px; height: 90px;">
                                </div>
                              </div>
                            </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">手机号</label>
                        <div class="col-lg-8">
                            <input type="text" placeholder="请输入手机号" class="form-control" maxlength="11" v-model="detail.username">
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">权限</label>
                        <div class="col-lg-8">
                            <select class="form-control" v-model="detail.roleId">
                              <option  v-for="(p,index) in permissionList" v-bind:value='p.id' :key="index">
                                  {{p.name}}
                              </option>
                            </select>
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-lg-3 control-label">职位</label>
                        <div class="col-lg-8">
                            <select class="form-control" v-model="detail.positionId">
                              <option  v-for="(p,index) in positionList" v-bind:value='p.id' :key="index">
                                  {{p.name}}
                              </option>
                            </select>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-white pull-left" v-if="optType=='edit'" @click="showUpdatePasswordModal">修改密码</button>
                  <button type="button" class="btn btn-primary" @click="editSubmit()">保存</button>
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
                              <input type="password" placeholder="请输入新密码" class="form-control" maxlength="20" v-model="pwd.pwd">
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-lg-3 control-label">再次输入</label>
                          <div class="col-lg-8">
                              <input type="password" placeholder="请再次输入新密码" class="form-control"  maxlength="20" v-model="pwd.repwd">
                          </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="updatePwdSubmit()" class="btn btn-primary">保存</button>
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
                      {{statusText}}
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="statusSubmit">确定</button>
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

                <button type="button" class="btn btn-primary" @click="deleteSubmit">确定</button>
                <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
                </div>
            </div>
            </div>
        </div>
    <!-- 新增员工弹出层 结束 -->

        <form action="" id="uploadImgForm" style="display:none;">
            <input type="file" name="uploadFile" id="uploadFile" multiple="multiple" style="display:none;" @change="imgUploadFileChange($event)">
        </form>

   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import vEmpty from "@/components/empty/empty.vue";
import { Page } from "iview";

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
      optIndex: -1,
      parentTotalPage: 0,
      pageNo: 1,
      pageSize: 15,
      queryKey: "",
      employeeList: [],
      headImageUrl: "",
      optType: "save",
      positionList: [],
      permissionList: [],
      statusText: "",
      save: {
        realname: "",
        username: "",
        image: "",
        roleId: "",
        positionId: "",
        password: ""
      },
      pwd: {
        pwd: "",
        repwd: ""
      },
      detail: {}
    };
  },
  mounted() {
    let _this = this;
    _this.getPositionList();
    _this.getPermissionList();
    _this.list();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),

    list: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.pageNo);
      param.push("pageSize=" + _this.pageSize);
      if (!_this.$lodash.isEmpty(_this.queryKey)) {
        param.push("queryKey=" + _this.queryKey);
      }
      _this.$axios
        .get("employees?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.total;
          try {
            _this.$lodash.forEach(res.list, function(item) {
              if (item.image) {
                item.imageUrl = superConst.IMAGE_STATIC_URL + item.image;
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
    updatePwdSubmit: function() {
      let _this = this;
      let cur = _this.employeeList[_this.optIndex];
      if (cur) {
        let pwd = _this.pwd.pwd;
        let repwd = _this.pwd.repwd;
        if (!regex.pwd(pwd)) {
          _this.$toast.warning("新密码格式不正确");
          return false;
        }
        if (!regex.pwd(repwd)) {
          _this.$toast.warning("确认密码格式不正确");
          return false;
        }
        if (pwd !== repwd) {
          _this.$toast.warning("两次密码不一至");
          return false;
        }

        _this.PUSH_LOADING();
        _this.$axios
          .get("employees/" + cur.id, "password=" + pwd + "&password1=" + repwd)
          .then(result => {
            let res = result.data;
            _this.SHIFT_LOADING();
            if (res.code && res.code > 0) {
              _this.$toast.error(res.msg);
            } else {
              _this.$toast.success("操作成功");
              $("#pwd-set").modal("hide");
            }
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      }
    },
    showUpdatePasswordModal: function() {
      let _this = this;
      _this.pwd.pwd = "";
      _this.pwd.repwd = "";
      $("#pwd-set").modal("show");
    },
    showEditModal: function(index) {
      let _this = this;
      _this.optIndex = index;
      let cur = _this.employeeList[index];
      if (cur) {
         _this.$axios
          .get("employees/" + cur.id)
          .then(result => {
            let res = result.data;
            _this.SHIFT_LOADING();
            if (res.code && res.code > 0) {
              _this.$toast.error(res.msg);
            } else {
              _this.detail = res;
              _this.headImageUrl = res.image  ? superConst.IMAGE_STATIC_URL + cur.image  : "";
            }
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      }
      $("#edit-worker").modal("show");
    },
    editSubmit: function(){
      let _this = this;
      let name = _this.detail.realname.trim();
      if (!name) {
        _this.$toast.warning("名称不可为空");
        return false;
      }
      if (!_this.detail.image) {
        _this.$toast.warning("请选择照片");
        return false;
      }
      if (!regex.phone(_this.detail.username.trim())) {
        _this.$toast.warning("手机号格式不正确");
        return false;
      }
      if (!_this.detail.roleId) {
        _this.$toast.warning("请选择权限");
        return false;
      }
      if (!_this.detail.positionId) {
        _this.$toast.warning("请选择权职位");
        return false;
      }
      _this.$axios
        .put("employees", _this.detail)
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$toast.success("操作成功");
            $("#edit-worker").modal('hide');
            _this.list();
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    showSaveModal: function() {
      let _this = this;
      _this.headImageUrl = "";
      _this.optType = "save";
      _this.save.realname = "";
      _this.save.username = "";
      _this.save.image = "";
      _this.save.password = "";
      //设定 权限和职位的id
      if (_this.permissionList.length > 0) {
        _this.save.roleId = _this.permissionList[0].id;
      }
      if (_this.positionList.length > 0) {
        _this.save.positionId = _this.positionList[0].id;
      }
      _this.optType = "save";
      $("#add-worker").modal("show");
    },
    saveSubmit: function() {
      let _this = this;
      let name = _this.save.realname.trim();
      if (!name) {
        _this.$toast.warning("名称不可为空");
        return false;
      }
      if (!_this.save.image) {
        _this.$toast.warning("请选择照片");
        return false;
      }
      if (!regex.phone(_this.save.username.trim())) {
        _this.$toast.warning("手机号格式不正确");
        return false;
      }
      if (!_this.save.roleId) {
        _this.$toast.warning("请选择权限");
        return false;
      }
      if (!_this.save.positionId) {
        _this.$toast.warning("请选择权职位");
        return false;
      }
      if (!regex.pwd(_this.save.password.trim())) {
        _this.$toast.warning("密码格式不正确");
        return false;
      }
      if (_this.optType == "save") {
        _this.save.id = "";
        _this.PUSH_LOADING();
        _this.$axios
          .post("employees", _this.save)
          .then(result => {
            let res = result.data;
            _this.SHIFT_LOADING();
            if (res.code && res.code > 0) {
              _this.$toast.error(res.msg);
            } else {
              _this.$toast.success("操作成功");
              $("#add-worker").modal("hide");
              _this.pageNo = 1;
              _this.list();
            }
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      } else if (_this.optType == "edit") {
        _this.$axios
          .post("employees", _this.save)
          .then(result => {
            let res = result.data;
            _this.SHIFT_LOADING();
            if (res.code && res.code > 0) {
              _this.$toast.error(res.msg);
            } else {
              _this.$toast.success("操作成功");
              _this.list();
            }
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      }
    },
    uploadImage: function() {
      let _this = this;
      $("#uploadFile").val(null);
      if ($("#uploadFile").val()) {
        document.getElementById("uploadImgForm").reset();
      }
      document.getElementById("uploadFile").click();
    },
    imgUploadFileChange: function(event) {
      let _this = this;
      if (event) {
        var filePath = "";
        var size = 0;
        var updatingCount = 0;

        if (event && event.target && event.target.files) {
          var file = event.target.files[0];
          size = file.size || 0;
          filePath = file.name;
          var index = filePath.lastIndexOf(".");
          var suffix = filePath.substring(index, filePath.length);

          if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix)) {
            _this.$toast.warning("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return false;
          }

          var imgSize = size / 1024 / 1024;
          if (imgSize > 1) {
            _this.$toast.warning("图片大小超过1M,请上传小于1M的图片.");
            return false;
          }
          var formData = new FormData();
          formData.append("file", file);

          _this.$axios
            .post("upload", formData, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(result => {
              let res = result.data;
              if (_this.optType == "save") {
                _this.save.image = res.fileCode;
              } else if (_this.optType == "edit") {
                _this.edit.image = res.fileCode;
              }
              _this.headImageUrl = superConst.IMAGE_STATIC_URL + res.fileCode;
              _this.$toast.success("操作成功");
            })
            .catch(err => {});
        }
      }
    },
    showStatusConfirm: function(index) {
      let _this = this;
      _this.optIndex = index;
      let cur = _this.employeeList[index];
      if (cur) {
        _this.statusText = cur.status == "use" ? "确定停用员工吗？停用后，员工将无法登录。"  : "确定启用员工吗？";
      }
      $("#stop-set").modal("show");
    },
    statusSubmit: function() {
      let _this = this;
      let cur = _this.employeeList[_this.optIndex];
      if (cur) {
        _this.PUSH_LOADING();
        _this.$axios
          .put("employees/" + cur.id + "/status","status=" + (cur.status == "use" ? "unUse" : "use"))
          .then(result => {
            let res = result.data;
            _this.SHIFT_LOADING();
            if (res.code && res.code > 0) {
              _this.$toast.error(res.msg);
            } else {
              _this.$toast.success("操作成功");
              $("#stop-set").modal("hide");
              _this.list();
            }
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      }
    },
    showDeleteConfirm: function(index) {
      let _this = this;
      _this.optIndex = index;
      $("#delete-set").modal("show");
    },
    deleteSubmit: function() {
      let _this = this;
      let cur = _this.employeeList[_this.optIndex];
      if (cur) {
        _this.PUSH_LOADING();
        _this.$axios
          .delete("employees/" + cur.id)
          .then(result => {
            let res = result.data;
            _this.SHIFT_LOADING();
            if (res.code && res.code > 0) {
              _this.$toast.error(res.msg);
            } else {
              _this.$toast.success("操作成功");
              $("#delete-set").modal('hide');
              _this.list();
            }
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      }
    },
    getPositionList: function() {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("positions", "")
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.positionList = result.data;
            if (result.data && result.data.length > 0) {
              _this.save.positionId = result.data[0].id;
            }
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    getPermissionList: function() {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("roles", "")
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.permissionList = result.data;
            if (result.data && result.data.length > 0) {
              _this.save.roleId = result.data[0].id;
            }
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
