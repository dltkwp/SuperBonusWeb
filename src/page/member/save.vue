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
                <li class="active"><a data-toggle="tab" href="#tab-1"> 会员信息</a></li>
              </ul>
              <div class="tab-content">
                <div id="tab-1" class="tab-pane active">
                  <div class="panel-body">
                    <fieldset class="form-horizontal">
                      <!-- <div class="form-group">
                        <label class="col-sm-2 control-label">编号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员编号" value="001">
                        </div>
                      </div> -->
                      <div class="form-group" style="margin-top:10px;">
                        <label class="col-sm-2 control-label">姓名:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员姓名" maxlength="20" v-model="realname">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">手机号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员手机号" maxlength="11" v-model="phone">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">照片:</label>
                        <div class="col-sm-6">
                          <div class="img-upload" @click.stop="uploadImage">
                            <div class="btn-delete" v-if="headImageUrl" @click.stop="removeImage" style="z-index:99999"><i class="fa fa-times-circle"></i></div>
                            <img v-if="headImageUrl" v-bind:src="headImageUrl" style="width: 90px; height: 90px;">
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">性别:</label>
                        <div class="col-sm-6">
                          <label class="radio-inline">
                            <input type="radio" name="inputSex" v-bind:checked="sex==1" @click="sexChange(1)">男</label>
                          <label class="radio-inline">
                            <input type="radio" name="inputSex" v-bind:checked="sex==2" @click="sexChange(2)">女</label>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">会员等级:</label>
                        <div class="col-sm-6">
                          <select class="form-control" v-model="levelId" @change="leveChange(levelId)">
                            <option v-for="(item,index) in levelList" :key='index' v-bind:value="item.id">{{item.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">企业:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员所在企业" maxlength="50" v-model="enterprise">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">职位:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员职位" maxlength="50" v-model="position">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">支付宝账号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入会员收款支付宝账号" maxlength="20" v-model="alipay">
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" @click="submit" type="button">保存</button>
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
        realname:'',
        phone:'',
        headImage:'',
        headImageUrl:'',
        sex:1,
        levelId:'',
        enterprise:'',
        position:'',
        alipay:'',
        levelList:[]
    };
  },
  mounted() {
    let _this = this;
    _this.SHIFT_LOADING();
    _this.getLevelList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    uploadImage: function(index) {
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
          if (imgSize > 3) {
            _this.$toast.warning("图片大小超过3M,请上传小于3M的图片.");
            return false;
          }
          var formData = new FormData();
          formData.append("file", file);

          _this.$axios
            .post("upload", formData, {
              headers: { "Content-Type": "multipart/form-data"}
            })
            .then(result => {
              let res = result.data;
              _this.headImageUrl    = superConst.IMAGE_STATIC_URL + res.fileCode;
              _this.headImage       = res.fileCode;
              _this.$toast.success("操作成功");
            })
            .catch(err => {});
        }
      }
    },
    getLevelList: function (){ // 如果没有自动加一条记录
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios.get('levels').
        then((result)=> {
          var res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.levelList = res;
            _this.levelId = res[0].id;
          }
          _this.SHIFT_LOADING();
      }).catch((err) => {
          _this.SHIFT_LOADING();
      });
    },
    leveChange: function (levelId) {
        let _this = this;
        _this.levelId = levelId;
    },
    removeImage: function () {
        let _this = this;
        _this.headImage = '';
        _this.headImageUrl = '';
    },
    submit: function () {
        let _this = this;
        
        let realname = _this.realname.trim();
        let phone = _this.phone.trim();
        let enterprise = _this.enterprise.trim();
        let position = _this.position.trim();
        let alipay =_this.alipay.trim();
        
        if (!realname) {
            _this.$toast.warning("姓名不可为空");
            return false;
        }
        if(!regex.phone(phone)){
            _this.$toast.warning('手机号格式不正确');
            return false;
        }
        if (!_this.headImage){
            _this.$toast.warning("请选择头像");
            return false;
        }
        if (!enterprise) {
            _this.$toast.warning("企业不可为空");
            return false;
        }
        if (!position) {
            _this.$toast.warning("职位不可为空");
            return false;
        }
        if (!alipay) {
            _this.$toast.warning("支付宝账号不可为空");
            return false;
        }

       let param = {
            "realname": realname,
            "phone": phone,
            "enterprise": enterprise,
            "position": position,
            "headImage" : _this.headImage,
            "alipay":   alipay,
            "sex": _this.sex,
            "levelId": _this.levelId
        }
        _this.PUSH_LOADING();
        _this.$axios
        .post("users",param)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){

          }else{
            _this.$toast.success("操作成功");
            _this.SHIFT_LOADING();
            setTimeout(function() {
              // window.location.href = "/member/v_index";
            }, 800);
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    sexChange: function (sex) {
        let _this = this;
        _this.sex = sex;
    }
  }
};
</script>

<style>

</style>
