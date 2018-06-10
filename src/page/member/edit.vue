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
                <li class="active"><a  href="javascript:;;">  会员信息</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane active">
                  <div class="panel-body">
                    <fieldset class="form-horizontal" style="border:0px;">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">编号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员编号" v-bind:value="user.id" disabled>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">姓名:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入员工姓名" maxlength="10" v-model="user.realname">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">手机号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" v-model="user.username" disabled>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">照片:</label>
                        <div class="col-sm-6">
                          <div class="img-upload" @click="uploadImage">
                            <img v-bind:src="user.headImage" style="width:90px;height:90px;">
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">性别:</label>
                          <div class="col-sm-6">
                            <label class="radio-inline">
                              <input type="radio" value="1" v-model="user.sex" v-bind:checked="user.sex==1" >男</label>
                            <label class="radio-inline">
                              <input type="radio" value="2"  v-model="user.sex"  v-bind:checked="user.sex==2">女</label>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-2 control-label">会员等级:</label>
                        <div class="col-sm-6">
                           <select class="form-control" v-model="user.levelId" @change="leveChange(user.levelId)">
                            <option v-for="(item,index) in levelList" :key='index' v-bind:value="item.id">{{item.name}}</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-2 control-label">企业:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员所在企业" maxlength="50" v-model="user.enterprise">
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-2 control-label">职位:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员职位" v-model="user.userPosition" maxlength="20">
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-2 control-label">支付宝账号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员收款支付宝账号"  v-model="user.alipay" maxlength="20">
                        </div>
                      </div>

                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button  v-permission="{code:'user_update'}" class="btn btn-primary" type="button" @click="submit">保存</button>
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
      user: {},
      memberId: 0,
      code: "",
      levelList:[]
    };
  },
  mounted() {
    let _this = this;
    _this.memberId = _this.$route.query.memberId;
    _this.SHIFT_LOADING();
    _this.getLevelList(function(){
      _this.getUserDetail();
    });
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    sexChange: function (sex) {
      _this.user.sex = sex || 1;
    },
    submit: function() {
      let _this = this;
      let param = {
        id: _this.memberId,
        realname: _this.user.realname,
        sex: _this.user.sex,
        levelId:_this.user.levelId
      };
      if (_this.code) {
        param.headImage = _this.code;
      }
      if (_this.user.userPosition) {
        param.userPosition = _this.user.userPosition;
      }
      if(_this.user.enterprise){
        param.enterprise = _this.user.enterprise;
      }
      if(_this.user.alipay){
        param.alipay = _this.user.alipay;
      }

      _this.PUSH_LOADING();
      _this.$axios
        .put("users", param)
        .then(result => {
          let res = result.data;
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$toast.success("操作成功");
             setTimeout(function() {
               window.location.href = "/member/v_index";
            }, 800);
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    getUserDetail: function() {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("users/" + _this.memberId)
        .then(result => {
          let res = result.data;
          if (res.headImage) {
            let httpIndex = res.headImage.indexOf("http");
            if (httpIndex == -1) {
              _this.code = res.headImage;
              res.headImage = superConst.IMAGE_STATIC_URL + res.headImage;
            }
          } else {
            _this.code = "";
            res.headImage = superConst.HEAD_IMAGE_DEFAULT;
          }
          res.id = _this.memberId;
          res.realname = res.realname || res.nickname;
          _this.user = res;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    uploadImage: function(index) {
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
              _this.user.headImage = superConst.IMAGE_STATIC_URL + res.fileCode;
              _this.code = res.fileCode;
              _this.$toast.success("操作成功");
            })
            .catch(err => {});
        }
      }
    },
    getLevelList: function (callback){ // 如果没有自动加一条记录
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios.get('levels').
        then((result)=> {
          var res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.levelList = res;
          }
          callback && callback();
          _this.SHIFT_LOADING();
      }).catch((err) => {
          _this.SHIFT_LOADING();
      });
    },
    leveChange: function (levelId) {
        let _this = this;
        _this.levelId = levelId;
    },
  }
};
</script>

<style>

</style>
