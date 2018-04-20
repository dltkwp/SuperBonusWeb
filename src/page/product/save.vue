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
                <li class="active">
                  <a data-toggle="tab" href="javascript:;;"> 基础信息</a>
                </li>
              </ul>
              <div class="tab-content">
                <div id="tab-1" class="tab-pane active">
                  <div class="panel-body">
                    <fieldset class="form-horizontal">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">编号:</label>
                        <div class="col-sm-6">
                          <input type="text" disabled readonly class="form-control" placeholder="请输入产品编号" v-model="productNo">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">名称:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入产品名称" v-model="productName" maxlength="20">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">图片:</label>
                        <div class="col-sm-10">
                          <div class="img-upload" v-for="(item,index) in imagesList" :key="index">
                                <img v-bind:src="item.url" v-if="item.url&&item.code" style="width:90px;height:90px;">
                                <div class="btn-delete" v-if="item.url&&item.code">
                                <i class="fa fa-times-circle"></i>
                                </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">简介:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入产品简介" v-model="description" maxlength="140">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">售价:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入售价" v-model="price" maxlength="10">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">状态:</label>
                        <div class="col-sm-6">
                          <select class="form-control" v-model="status">
                            <option value="1">在售</option>
                            <option value="0">停售</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">产品介绍:</label>
                        <div class="col-sm-10">
                          <div class="summernote">
                            <h3>请添加产品描述</h3>
                          </div>
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" type="submit">保存</button>
                          <button class="btn btn-white" type="submit">取消</button>
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
      productName: "",
      productNo: "",
      imagesList: [],
      description: "",
      price: 0,
      status: "",
      detail: ""
    };
  },
  mounted() {
    let _this = this;
    _this.initPage();
    _this.getNextProductNo();
  },
  methods: {
      ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    initPage: function(){
        let _this = this;
        _this.initImages();
        _this.productName="";
        _this.productNo="";
        _this.imagesList="";
        _this.description="";
        _this.price="";
        _this.status="";
        _this.detail="";
    },
    getNextProductNo: function() {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("next")
        .then(result => {
          let res = result.data;
          _this.productNo = res.nextProductNo
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    initImages:function(){
        this.imagesList.push({ url: "", code: ""});
        this.imagesList.push({ url: "", code: ""});
        this.imagesList.push({ url: "", code: ""});
        this.imagesList.push({ url: "", code: ""});
        this.imagesList.push({ url: "", code: ""});
    },
    uploadImage: function() {
      $("#uploadFile").val(null);
      if ($("#uploadFile").val()) {
        document.getElementById("uploadImgForm").reset();
      }
      document.getElementById("uploadFile").click();
    },
    imgUploadFileChange: function(event) {
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

          let _this = this;
          _this.$axios
            .post("upload", formData, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(result => {
              let res = result.data;
              let cur = _this.$axios.find(_this.imagesList, { 'url': '', 'code': '' });
              cur.url= superConst.IMAGE_STATIC_URL + res.fileCode;
              cur.code = res.fileCode;
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
