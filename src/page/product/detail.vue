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
                          <div v-for="(item,index) in imagesList" :key="index">
                              <div class="btn-delete" v-if="item.url&&item.code" @click="removeImage(index)">
                                <i class="fa fa-times-circle"></i>
                              </div>
                              <div class="img-upload"  @click="uploadImage(index,$event)">
                                  <img v-bind:src="item.url" v-if="item.url&&item.code" style="width:90px;height:90px;" >
                              </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">简介:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入产品简介" v-model="intoduction" maxlength="140">
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
                            <option value="1">开售</option>
                            <option value="0">停售</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">产品介绍:</label>
                        <div class="col-sm-10">
                            <quill-editor v-model="description" style="height:260px;"
                                  ref="myQuillEditor1"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)"
                                  >
                              </quill-editor>
                        </div>
                      </div>
                      <div class="form-group" style=" margin-top:  82px">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button class="btn btn-primary" type="button" @click="saveSubmit">保存</button>
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
import { quillEditor } from 'vue-quill-editor'


export default {
  components: {
    vMenus,
    vTop,
    vFoot,
    quillEditor
  },
  data() {
    return {
      id:'',
      productName: "",
      productNo: "",
      imagesList: [],
      intoduction: "", //  简介
      price: 0,
      status: "1",
      description: "", //  描述
      editorOption: {
        
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor1.quill
    }
  },
  mounted() {
    let _this = this;
    _this.id = _this.$route.query.productId;
    _this.SHIFT_LOADING();
    _this.initPage();
    _this.getProductDetail();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.description = html
    },
    initPage: function() {
      let _this = this;
      _this.initImages();
      _this.productName = "";
      _this.productNo = "";
      _this.description = "";
      _this.price = "";
      _this.status = "1";
      _this.intoduction = "";
    },
    getProductDetail: function() {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("products/" + _this.id)
        .then(result => {
          let res = result.data;
          _this.id = res.id;
          _this.productName = res.productName;
          _this.productNo = res.productNo;
          _this.description = res.description;
          _this.price = res.price;
          _this.status = res.status? "1" : "0";
          _this.intoduction = res.intoduction;
          // 图片处理   
          if (res.images && res.images.length>0) {
              let arr = res.images.split(',')
              _this.$lodash.forEach(arr,function(code,index){
                  _this.imagesList[index] = {
                      url:  superConst.IMAGE_STATIC_URL + code,
                      code: code
                  }
              })
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    initImages: function() {
      this.imagesList.push({ url: "", code: "" });
      this.imagesList.push({ url: "", code: "" });
      this.imagesList.push({ url: "", code: "" });
      this.imagesList.push({ url: "", code: "" });
      this.imagesList.push({ url: "", code: "" });
    },
    uploadImage: function(index) {
      let _this = this;
      let curImage = _this.imagesList[index];
      if(curImage&&curImage.url==''&&curImage.code==''){
        $("#uploadFile").val(null);
        if ($("#uploadFile").val()) {
          document.getElementById("uploadImgForm").reset();
        }
        document.getElementById("uploadFile").click();
      }
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
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(result => {
              let res = result.data;
              let cur = _this.$lodash.find(_this.imagesList, function(item){
                return item.url == '' && item.code =='';
              });
              cur.url = superConst.IMAGE_STATIC_URL + res.fileCode;
              cur.code = res.fileCode;
              _this.$toast.success("操作成功");
            })
            .catch(err => {});
        }
      }
    },
    removeImage: function (index) {
      console.log(index,2122222);
       let _this = this;
       let curImage = _this.imagesList[index];
       console.log(_this.imagesList);
       if (curImage){
         console.log(curImage);
         _this.imagesList[index].url = '';
         _this.imagesList[index].code = '';
       console.log(_this.imagesList);
       }
    },
    saveSubmit: function() {
      let _this = this;
      let productName = _this.productName.trim();
      let intoduction = _this.intoduction.trim();
      let price = (_this.price+'').trim();
      let description = _this.description

      let imageCodes = [];
      _this.$lodash.forEach(_this.imagesList,function(item){
          if(item.code){
            imageCodes.push(item.code);
          }
      });

      if (productName == "") {
        _this.$toast.warning("名称不可为空");
        return false;
      }
      if(imageCodes.length==0){
        _this.$toast.warning('至少上传一张图片');
        return false;
      }
      if (intoduction == "") {
        _this.$toast.warning("简介不可为空");
        return false;
      }
      if (!regex.money(price)) {
        _this.$toast.warning("价格格式不正确");
        return false;
      }
      if (description == "") {
        _this.$toast.warning("产品介绍不可为空");
        return false;
      }
      
      let param = {
        "id":_this.id,
        "description": description,
        "price": price,
        "productName": productName,
        "images" : imageCodes.join(','),
        "intoduction":intoduction,
        "status":_this.status==1?true:false
      }
      _this.PUSH_LOADING();
      _this.$axios
        .put("products",param)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){

          }else{
            _this.$toast.success("操作成功");
            _this.SHIFT_LOADING();
            setTimeout(function() {
              //window.location.href = "/product/v_index";
            }, 800);
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
