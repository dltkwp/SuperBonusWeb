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
                <li class="active"><a data-toggle="tab" href="#tab-1"> 个人资料</a></li>
              </ul>
              <div class="tab-content">
                <div id="tab-1" class="tab-pane active">
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
                          <input type="text" class="form-control" placeholder="请输入员工姓名" value="张三">
                        </div>
                      </div>
                                                                                                                           <div class="form-group">
                        <label class="col-sm-2 control-label">手机号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入员工手机号" value="15242612898" disabled>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">照片:</label>
                        <div class="col-sm-6">
                          <div class="img-upload" @click="uploadImage">
                            <img v-bind:src="item.headImage" style="width:90px;height:90px;">
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">权限:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" value="管理员" disabled>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">职位:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" value="管理员" disabled>
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" type="button" @click="submit">保存</button>
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
import vEmpty from "@/components/empty/empty.vue";
import pagination from "@/components/pagination/pagination.vue";

import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util"

export default {
  components: {
    vMenus,
    vTop,
    vFoot
  },
  data() {
    return {
        user:{}
    };
  },
  mounted() {
    let _this = this;
    _this.SHIFT_LOADING();
    _this.getUserDetail();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    submit: function (){
        let _this = this;
        let id = _this.$route.query.memberId;

        _this.PUSH_LOADING();
        _this.$axios
            .post("users",_this.user)
            .then(result => {
                let res = result.data;
                if(res.code && res.code >0){
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
    getUserDetail: function () {
        let _this = this;
        let id = _this.$route.query.memberId;

        _this.PUSH_LOADING();
        _this.$axios
            .get("users/" + id)
            .then(result => {
                let res = result.data;
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
      let _this = this;ßß
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
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(result => {
              let res = result.data;
              _this.user.headImage = superConst.IMAGE_STATIC_URL + res.fileCode;
              _this.$toast.success("操作成功");
            })
            .catch(err => {});
        }
      }
    }
  }
};
</script>

<style>

</style>
