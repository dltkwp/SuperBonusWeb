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
                <li v-bind:class='{active:tabType=="user"}' @click="tabChange('user')" ><a href="javascript:;;"> 个人资料</a></li>
                <li v-bind:class='{active:tabType=="pwd"}' @click="tabChange('pwd')"  ><a href="javascript:;;"> 修改密码</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane" v-bind:class='{active:tabType=="user"}' >
                  <div class="panel-body">
                    <fieldset class="form-horizontal">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">编号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员编号" value="001" disabled>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">姓名:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入员工姓名" v-model="edit.realname" maxlength="20">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">手机号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入员工手机号" v-model="edit.username" disabled readonly>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">照片:</label>
                        <div class="col-sm-6">
                          <div class="img-upload" @click="uploadImage">
                            <img v-bind:src='edit.headImageUrl' v-if="edit.headImageUrl" style="width: 90px; height: 90px;">
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">权限:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" v-model="edit.roleName" disabled readonly>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">职位:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" v-model="edit.positionName" readonly disabled>
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" type="button" @click="updateUser">保存</button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="tab-pane" v-bind:class='{active:tabType=="pwd"}' >
                  <div class="panel-body">
                    <fieldset class="form-horizontal">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">旧密码:</label>
                        <div class="col-sm-6">
                          <input type="password" class="form-control" placeholder="请输入会员旧密码" v-model="pwd.oldPwd"  maxlength="20">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">新密码:</label>
                        <div class="col-sm-6">
                          <input type="password" class="form-control" placeholder="请输入会员新密码"  v-model="pwd.newPwd"  maxlength="20">
                        </div>
                      </div> 
                     <div class="form-group">
                        <label class="col-sm-2 control-label">新密码:</label>
                        <div class="col-sm-6">
                          <input type="password" class="form-control" placeholder="请输入会员新密码"  v-model="pwd.rePwd"  maxlength="20">
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button @click="updatePwd" class="btn btn-primary" type="button">保存</button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

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

import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util";

export default {
  components: {
    vMenus,
    vTop
  },
  data() {
    return {
      edit:{
        realname:'',
        username:'',
        headImage:'',
        headImageUrl:'',
        roleName:'',
        positionName:''
      },
      pwd:{
        oldPwd: '',
        newPwd: '',
        rePwd: ''
      },
      tabType:'user'
    };
  },
  mounted() {
    let _this = this;
    _this.getUser();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    updateUser: function () {
      let _this = this;
      let name = _this.edit.realname;
      if(!name){
        _this.$toast.warning('姓名不可为空');
        return false;
      }

      let param = {
        id: _this.edit.id,
        realname: _this.edit.realname,
        image: _this.edit.headImage
      };
      // 调用接口

      _this.PUSH_LOADING();
      _this.$axios
        .put("employees", param)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
             _this.$toast.success('操作成功');
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });

    },
    updatePwd: function () {
      let _this = this;
      let oldPwd = _this.pwd.oldPwd
      let newPwd = _this.pwd.newPwd
      let rePwd =  _this.pwd.rePwd
      
      if(!oldPwd) {
        _this.$toast.warning("旧密码不可为空");
        return false;
      }
      if (!regex.pwd(newPwd)) {
        _this.$toast.warning('新密码格式不正确');
        return false;
      }
      if (!regex.pwd(rePwd)) {
        _this.$toast.warning('确认密码格式不正确');
        return false;
      }
      if(newPwd!==rePwd) {
        _this.$toast.warning('两次密码不匹配');
        return false;
      }

      _this.PUSH_LOADING();
      _this.$axios
        .put("employees/" + _this.edit.id + "?oldPassword=" + oldPwd + "&password=" + newPwd + "&password1=" + rePwd)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.SHIFT_LOADING();
            _this.$toast.success("操作成功");
            _this.pwd.oldPwd = '';
            _this.pwd.newPwd = '';
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    tabChange: function (key) {
      let _this = this;
      _this.tabType = key;
      switch (key) {
        case 'pwd': {
          _this.pwd.oldPwd = '';
          _this.pwd.newPwd = '';
        }break;      
      }
    },
    getUser: function () {
      let _this = this;
      _this.PUSH_LOADING();
      let id = JSON.parse(localStorage.getItem(superConst.LOGIN_USER_INFO_KEY)).id
      _this.$axios
        .get("employees/" + id)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            res.headImage = res.image;
            
            res.image && (res.headImageUrl = superConst.IMAGE_STATIC_URL + res.image)
            _this.edit = res;
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
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
              _this.edit.headImageUrl = superConst.IMAGE_STATIC_URL + res.fileCode;
              _this.edit.headImage = res.fileCode;
              _this.$toast.success("操作成功");
            })
            .catch(err => {});
        }
      }
    },
  }
};
</script>

<style>

</style>
