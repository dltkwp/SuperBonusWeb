<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
            <div class="row">
          <div class="col-lg-12">
            <div class="tabs-container">
              <ul class="nav nav-tabs">
                <li v-bind:class="{'active':tabType=='permission'}" @click="tabChange('permission')"><a data-toggle="tab" href="#tab-1"> 权限设置</a></li>
                <li v-bind:class="{'active':tabType=='position'}"  @click="tabChange('position')"><a data-toggle="tab" href="#tab-2"> 职位设置</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane" v-bind:class="{'active':tabType=='permission'}" >
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="btn btn-primary" @click="showSavePermissionModal()">新增权限</div>
                        <div class="btn btn-white" @click="showPermissionManagerModal()">权限管理</div>
                      </div>
                    </div>
                    <fieldset class="form-horizontal m-t-lg"  v-if="roleList.length>0">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">权限名称:</label>
                        <div class="col-sm-10">
                          <div style="margin-right:10px" @click="roleItemClick(index)" class="btn" v-bind:class="{'btn-danger':item.id===curRoleId,'btn-default': item.id!==curRoleId}" v-for="(item,index) in roleList" :key="index">{{item.name}}</div>
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">对应权限:</label>
                        <div class="col-sm-10">
                          <table class="table table-bordered">
                            <tbody>
                              <tr v-for="(item,pIndex) in permissionList" :key="pIndex">
                                <td style="width:150px;">
                                  <label class="checkbox-inline">
                                    <input type="checkbox"  v-bind:checked="item.select" @click="parentNodeClick(pIndex,$event)">{{item.name}} 
                                  </label>
                                </td>
                                <td>
                                  <label class="checkbox-inline w-100" v-for="(sub,cIndex) in item.subs" :key="cIndex"> 
                                      <input type="checkbox"  v-bind:checked="sub.select" @click="childNodeClick(pIndex,cIndex,$event)"> {{sub.name}} 
                                  </label> 
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" @click="savePermission" type="button">保存</button>
                        </div>
                      </div>
                    </fieldset>
                    <v-empty :isShow="roleList.length==0"></v-empty>
                  </div>
                </div>
                <div class="tab-pane" v-bind:class="{'active':tabType=='position'}" >
                  <div class="panel-body">
                    <div class="row m-b-sm">
                      <div class="col-md-12">
                        <div class="btn btn-primary" @click="showSavePositionModal()">新增职位</div>
                      </div>
                    </div>
                    <div class="table-responsive ">
                      <table class="table table-bordered table-stripped table-hover">
                        <thead>
                          <tr>
                            <th> 职位</th>
                            <th> 操作 </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in positionList" :key='index'>
                            <td>{{item.name}}</td>
                            <td>
                              <a class="btn btn-white btn-sm" @click="showPositionEditModal(index)">编辑</a>
                              <a class="btn btn-white btn-sm" @click="showPositionDeleteConfirmModal(index)">删除</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <v-empty :isShow="positionList.length==0"></v-empty>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>


      <div id="add-power" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">新增权限</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-12">
                  <form class="form-horizontal">
                    <div class="form-group">
                      <label class="col-lg-3 control-label">权限名称</label>
                      <div class="col-lg-8">
                        <input type="email" placeholder="请输入权限名称" class="form-control" maxlength="15" v-model="permissionSaveName">
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="savePermissionSubmit()" class="btn btn-primary">保存</button>
              <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>

      <div id="edit-power" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">权限管理</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-12">
                  <table class="table table-bordered table-stripped text-center">
                    <thead>
                      <tr>
                        <th class="text-center"> 权限名称 </th>
                        <th class="text-center"> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in roleListManager" :key="index">
                        <td>
                          <input class="form-control" value="管理员" maxlength="12" v-model="item.name">
                        </td>
                        <td>
                          <a class="btn btn-white btn-sm" href="javascript:;;" @click="deletePowerConfirm(index)">删除</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                   <v-empty :isShow="roleListManager.length==0"></v-empty>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="bathRolesSubmit()" v-if="roleListManager.length>0" class="btn btn-primary">保存</button>
              <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>

      <div id="delete-power" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">温馨提示</h4>
            </div>
            <div class="modal-body">
              <div class="alert alert-danger">确定删除权限吗？</div>
            </div>
            <div class="modal-footer">

              <button type="button" class="btn btn-primary" @click="deletePowerSubmit">确定</button>
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
              <div class="alert alert-danger">确定删除职位吗</div>
            </div>
            <div class="modal-footer">

              <button type="button" @click="deletePositionSubmit()" class="btn btn-primary">确定</button>
              <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
      
      <div id="add-duty" class="modal fade" aria-hidden="true" style="display: none;">
          <div class="modal-dialog modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">新增职位</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-12">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label class="col-lg-3 control-label">职位名称</label>
                        <div class="col-lg-8">
                          <input type="email" placeholder="请输入职位名称" class="form-control" maxlength="20" v-model="positionSaveName">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="savePositionSubmit()">保存</button>
                <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
              </div>
            </div>
          </div>
      </div>
        
      <div id="duty-set" class="modal fade" aria-hidden="true" style="display: none;">
          <div class="modal-dialog modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">编辑职位</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-12">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label class="col-lg-3 control-label">职位名称</label>
                        <div class="col-lg-8">
                          <input type="text" placeholder="请输入职位名称" class="form-control" v-model="positionEditName" maxlength="20">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="positionEditSubmit()">保存</button>
                <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
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

export default {
  components: {
    vMenus,
    vTop,
    vEmpty
  },
  data() {
    return {
      tabType: "permission", //
      roleList: [],
      roleListManager: [],
      positionList: [],
      permissionList: [],
      optionIndex: -1,
      curRoleId: -1,
      positionEditName: "",
      positionSaveName: "",
      permissionSaveName: ""
    };
  },
  mounted() {
    let _this = this;
    _this.SHIFT_LOADING();
    _this.tabChange("permission");
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    parentNodeClick: function(pIndex,event){
        let _this = this;
        let cur = _this.permissionList[pIndex];
        if(cur){
            if(event.target.checked){
                cur.select = true;
               _this.$lodash.forEach(cur.subs,function(o){
                 o.select = true;
               });
            }else{
                cur.select = false;
              _this.$lodash.forEach(cur.subs,function(o){
                 o.select = false;
               });
            }
        }
    },
    childNodeClick: function(pIndex,cIndex,event){
      let _this = this;
      let parentNode = _this.permissionList[pIndex];
      let childNode = parentNode.subs[cIndex];

      if(event.target.checked){
          childNode.select = true;
          parentNode.select = true;
          let curSelect = _this.$lodash.find(parentNode.subs,function(o){
            return o.code.indexOf('_select')>=0
          })
          if(!curSelect.select) {
            curSelect.select = true
          }
      }else{
        if (childNode.code.indexOf('_select') >= 0){
          let checkCnt = _this.$lodash.filter(parentNode.subs,function(o){
            return o.code.indexOf('_select') == -1 && o.select
          })
          if (checkCnt.length >0) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            childNode.select = false;
          }
        }else {
          childNode.select = false;
        }
        let selectArr = _this.$lodash.filter(parentNode.subs,{select:true});
        if(selectArr.length==0){
          parentNode.select = false;
        }
      }
    },
    savePermission: function() {
      let _this = this;
      let roleInfoId = [];
      _this.$lodash.forEach(_this.permissionList,function(item){
        if(item.select){
          roleInfoId.push(item.id);
          _this.$lodash.forEach(item.subs,function(sub){
            if(sub.select){
              roleInfoId.push(sub.id);
            }
          });
        }
      });

      if(roleInfoId.length==0){
        _this.$toast.warning("请选择权限");
        return false;
      }
      _this.PUSH_LOADING();
      _this.$axios
        .post("roles/" + _this.curRoleId, {roleInfoId:roleInfoId})
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$toast.success("操作成功");
            _this.getPermissionByRoleId(_this.curRoleId);
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });

    },
    roleItemClick: function(index) {
      let _this = this;
      let cur = _this.roleList[index];
      if (cur) {
        _this.curRoleId = cur.id;
        _this.getPermissionByRoleId(cur.id);
      }
    },
    deletePowerConfirm: function(index) {
      let _this = this;
      _this.optionIndex = index;
      $("#delete-power").modal("show");
    },
    deletePowerSubmit: function() {
      let _this = this;
      let cur = _this.roleListManager[_this.optionIndex];
      if (cur) {
        _this.PUSH_LOADING();
        _this.$axios
          .delete("roles/" + cur.id, "")
          .then(result => {
            let res = result.data;
            _this.SHIFT_LOADING();
            if (res.code && res.code > 0) {
              _this.$toast.error(res.msg);
            } else {
              _this.$toast.success("操作成功");
              $("#delete-power").modal("hide");
              _this.getRoles();
            }
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      }
    },
    showPermissionManagerModal: function() {
      let _this = this;
      _this.roleListManager = _this.$lodash.cloneDeep(_this.roleList);
      $("#edit-power").modal("show");
    },
    showSavePermissionModal: function() {
      let _this = this;
      _this.permissionSaveName = "";
      $("#add-power").modal("show");
    },
    savePermissionSubmit: function() {
      let _this = this;
      let name = _this.permissionSaveName;
      if (!name) {
        _this.$toast.warning("名称不可为空");
        return false;
      }

      _this.PUSH_LOADING();
      _this.$axios
        .post("roles", {name: name})
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$toast.success("操作成功");
            $("#add-power").modal("hide");
            _this.getRoles();
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    showSavePositionModal: function() {
      let _this = this;
      _this.positionSaveName = "";
      $("#add-duty").modal("show");
    },
    savePositionSubmit: function() {
      let _this = this;
      let name = _this.positionSaveName.trim();
      if (!name) {
        _this.$toast.warning("职位名称不可为空");
        return false;
      }

      let findIndex = _this.$lodash.findIndex(_this.positionList,{name:name});
      if(findIndex>=0){
         _this.$toast.warning("名称已存在");
        return false;
      }

      _this.PUSH_LOADING();
      _this.$axios
        .post("positions", {"name":name})
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$toast.success("操作成功");
            $("#add-duty").modal("hide");
            _this.getPositions();
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    showPositionDeleteConfirmModal: function(index) {
      let _this = this;
      _this.optionIndex = index;
      $("#delete-set").modal("show");
    },
    showPositionEditModal: function(index) {
      let _this = this;
      _this.optionIndex = index;
      let cur = _this.positionList[index];
      _this.positionEditName = cur.name;
      $("#duty-set").modal("show");
    },
    deletePositionSubmit: function() {
      let _this = this;
      let cur = _this.positionList[_this.optionIndex];
      _this.PUSH_LOADING();
      _this.$axios
        .delete("positions/" + cur.id, "")
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$toast.success("操作成功");
            $("#delete-set").modal("hide");
            _this.getPositions();
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    positionEditSubmit: function() {
      let _this = this;
      let cur = _this.positionList[_this.optionIndex];
      let name = _this.positionEditName.trim();
      if (!name) {
        _this.$toast.warning("职位名称不可为空");
        return false;
      }

      let tmpArr = _this.$lodash.filter(_this.positionList,function(o){
        return o.name==name&&o.id!==cur.id;
      });
      if(tmpArr.length>0){
         _this.$toast.warning("名称已存在");
        return false;
      }

      _this.PUSH_LOADING();
      _this.$axios
        .put("positions", {
          name: name,
          id: cur.id
        })
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$toast.success("操作成功");
            $("#duty-set").modal("hide");
            _this.getPositions();
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    tabChange: function(key) {
      let _this = this;
      _this.tabType = key;
      switch (key) {
        case "permission":
          {
            _this.getRoles();
          }
          break;
        case "position":
          {
            _this.getPositions();
          }
          break;
      }
    },
    getPermissionByRoleId: function(roleId) {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("roles/" + roleId, "")
        .then(result => {
          let res = result.data;
          _this.SHIFT_LOADING();
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.permissionList = result.data;
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    getRoles: function() {
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
            _this.roleList = result.data;
            _this.roleListManager = _this.$lodash.cloneDeep(_this.roleList);
            if (_this.roleList.length > 0) {
              let roleId = _this.roleList[0].id;
              _this.curRoleId = roleId;
              _this.getPermissionByRoleId(roleId);
            }
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    getPositions: function() {
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
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    bathRolesSubmit: function() {
      let _this = this;

      let tmpList = _this.$lodash.filter(_this.roleListManager,function(o){ 
         return o.name == '';
      });

      if(tmpList.length>0){
        _this.$toast.warning("名称不可为空");
      }else{
         _this.PUSH_LOADING();
         
        _this.$axios
          .post("/roles/batch/names", {roles:_this.roleListManager})
          .then(result => {
            let res = result.data;
            _this.SHIFT_LOADING();
            if (res.code && res.code > 0) {
              _this.$toast.error(res.msg);
            } else {
              _this.$toast.success("操作成功");
              $("#edit-power").modal("hide");
              _this.getRoles();
            }
          })
          .catch(err => {
            _this.SHIFT_LOADING();
          });
      }
    }
  }
};
</script>

<style>
</style>
