<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
           <div class="row">
          <div class="col-lg-12">
            <div class="ibox">
              <div class="ibox-title">广告管理</div>
              <div class="ibox-content">
                <div class="table-responsive">
                  <table class="table table-bordered table-stripped">
                    <thead>
                      <tr>
                        <th style="width:300px;"> 广告图片 </th>
                        <th> 跳转至 </th>
                        <th> 显示顺序 </th>
                        <th> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in advList" :key='index'>
                        <td @click="uploadImage(index)" style="cursor:pointer;">
                            <img v-bind:src="item.image" v-if="item.image" class="banner-ad">
                            <img src="https://bonus.oss-cn-beijing.aliyuncs.com/product/6A5822054C6D436E92819791F8457DF9.png" v-if="!item.image" class="banner-ad">
                        </td>
                        <td>
                          <div class="m-t">
                            <div @click="showSelectProductModal(index)" class="btn btn-sm btn-white">选择产品</div>
                            &nbsp;&nbsp; {{item.name || ''}}
                          </div>
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="item.sort" maxlength="3" 
                                v-on:blur="sortChange(index)"
                                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" 
                                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
                        </td>
                        <td><button class="btn btn-white" @click="removeItem(index)" style="cursor:pointer;"><i class="fa fa-trash"></i> </button></td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="help-block ">*建议广告图片尺寸750px*240px</div>
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

        <div id="choose-product" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">选择产品</h4>
            </div>
            <div class="modal-body">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>产品名称</th>
                    <th>售价</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in productList" :key="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.productName}}</td>
                    <td>¥{{item.price}}</td>
                    <td>
                      <div @click="selectProductSubmit(index)" class="btn btn-primary btn-sm">选择</div>
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

export default {
  components: {
    vMenus,
    vTop,
    vFoot,
    vEmpty,
    pagination
  },
  data() {
    return {
      advList: [],
      curIndex: -1,
      selectProductIndex: -1,
      productList: [],
      parentTotalPage: 0,
      parentCurrentpage: 1
    };
  },
  mounted() {
    let _this = this;
    _this.initAdv();
    _this.getAdvList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    sortChange: function() {
      let _this = this;
      _this.advList = _.sortBy(_this.advList, function(o) { return o.sort; });
      _this.submit();
    },
    getAdvList: function() {
      let _this = this;
      _this.initAdv();
      _this.PUSH_LOADING();
      _this.$axios
        .get("advs")
        .then(result => {
          var res = result.data;
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$lodash.forEach(res, function(item, index) {
              let cur = _this.advList[index];
              cur.code = item.image;
              cur.image = superConst.IMAGE_STATIC_URL + item.image;
              cur.name = item.name;
              cur.href = item.href;
            });
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    initAdv: function() {
      let _this = this;
      let arr = [];
      arr.push({ image: "", code: "", type: "product", href: "", sort: 1, name:'' });
      arr.push({ image: "", code: "", type: "product", href: "", sort: 2, name:'' });
      arr.push({ image: "", code: "", type: "product", href: "", sort: 3, name:'' });
      arr.push({ image: "", code: "", type: "product", href: "", sort: 4, name:'' });
      arr.push({ image: "", code: "", type: "product", href: "", sort: 5, name:'' });
      _this.advList = arr;
    },
    submit: function() {
      let _this = this;
      let param = [];
      _this.$lodash.forEach(_this.advList, function(item) {
        if (item.image && item.code) {
          param.push({
            type: item.type,
            href: item.href||'',
            image: item.code,
            name: item.name ||''
          });
        }
      });
      _this.PUSH_LOADING();
      _this.$axios
        .post("advs", {
          advs: param
        })
        .then(result => {
          var res = result.data;
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.getAdvList();
          }
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    showSelectProductModal: function(index) {
      let _this = this;
      _this.selectProductIndex = index;
      _this.parentCurrentpage = 1;
      _this.getProductList();
      $("#choose-product").modal("show");
    },
    parentCallback(cPage) {
      let _this = this;
      _this.parentCurrentpage = cPage;
      _this.getProductList();
    },
    getProductList: function() {
      let _this = this;
      _this.PUSH_LOADING();
      let param = [];
      param.push("pageNum=" + _this.parentCurrentpage);
      param.push("pageSize=" + 15);
      param.push("status=1");

      _this.$axios
        .get("products?" + param.join("&"))
        .then(result => {
          let res = result.data;
          _this.parentTotalPage = res.pages;
          _this.productList = res.list;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    selectProductSubmit: function(index) {
      let _this = this;
      $("#choose-product").modal("hide");
      let cur = _this.productList[index];
      if (cur){
        _this.advList[_this.selectProductIndex].name = cur.productName;
        _this.advList[_this.selectProductIndex].href = cur.id;
      }
      _this.submit();
    },
    removeItem: function(index) {
      let _this = this;
      let cur = _this.advList[index];
      cur.image = "";
      cur.code = "";
      _this.submit();
    },
    uploadImage: function(index) {
      let _this = this;
      _this.curIndex = index;
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
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(result => {
              let res = result.data;
              let cur = _this.advList[_this.curIndex];
              cur.image = superConst.IMAGE_STATIC_URL + res.fileCode;
              cur.code = res.fileCode;
              _this.$toast.success("操作成功");
              _this.submit();
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
