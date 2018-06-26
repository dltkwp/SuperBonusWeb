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
                  <li class="active"><a data-toggle="tab" href="#tab-1"> 圆桌会议信息</a></li>
                </ul>
                <div class="tab-content">
                  <div id="tab-1" class="tab-pane active">
                    <div class="panel-body">
                      <fieldset class="form-horizontal">
                        <div class="form-group">
                          <label class="col-sm-2 control-label">名称:</label>
                          <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="请输入圆桌会名称" maxlength="12" v-model="title">
                          </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">分类:</label>
                            <div class="col-sm-6">
                            <select class="form-control" v-model="categoryId">
                              <option  v-for="(p,index) in categoryList" v-bind:value='p.id' :key="index">
                                  {{p.name}}
                              </option>
                            </select>
                            </div>
                            <div class="col-sm-2">
                                <div class="btn btn-default" @click="showCategoryModal">分类设置</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">略缩图:</label>
                            <div class="col-sm-10">
                            <div class="img-upload" @click.stop="uploadImage($event)">
                                <img :src="img" style="width:90px;height:90px;" v-if="img">
                            </div>
                        </div>
                        </div>

                        <div class="form-group">
                          <label class="col-sm-2 control-label">发布时间:</label>
                          <div class="col-sm-6">
                            <date-picker :editable="false" :value="created" format="yyyy/MM/dd" type="date" placement="bottom-end" @on-change="handleChange" placeholder="请选择发布时间" style="width: 200px"></date-picker>
                          </div>
                        </div>

                        <div class="form-group">
                          <label class="col-sm-2 control-label">内容:</label>
                          <div class="col-sm-10">
                            <div class="summernote">
                              <quill-editor v-model="description" style="height:260px;"
                                  ref="myQuillEditor"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)">
                              </quill-editor>
                            </div>
                          </div>
                        </div>
                        <div class="form-group" style=" margin-top:  82px" >
                          <div class="col-sm-4 col-sm-offset-2">
                            <button  v-permission="{code:'meeting_insert'}" class="btn btn-primary" type="buttion" @click="saveSubmit">保存</button>
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

      <form action="" id="uploadImgFormEdit" style="display:none;">
        <input type="file" name="uploadFileEdit" id="uploadFileEdit" multiple="multiple" style="display:none;" @change="imgUploadEditFileChange($event)">
      </form>

    <div id="type-setting" class="modal fade" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">分类设置</h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>分类名称</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in categoryList" :key="index">
                                <td>{{index + 1}}</td>
                                <td v-if="item.type != 'edit'">{{item.name}}</td>
                                <td v-if="item.type == 'edit'">
                                    <input class="form-control" placeholder="请输入圆桌会分类名称" v-model="item.name" maxlength="15">
                                </td>
                                <td>
                                    <div  v-permission="{code:'meeting_category_update'}"  class="btn btn-default btn-sm" v-if="item.type != 'edit'" @click="categoryEdit(index)">编辑</div>
                                    <div  v-permission="{code:'meeting_category_update'}"  class="btn btn-primary btn-sm" v-if="item.type == 'edit'" @click="categoryEditSave(index)">保存</div>
                                    <div  v-permission="{code:'meeting_category_delete'}"  class="btn btn-default btn-sm" v-if="item.type == 'edit'" @click="showCategoryDeleteModal(index)">删除</div>
                                </td>
                            </tr>
                            <tr v-permission="{code:'meeting_category_insert'}" >
                                <td>{{categoryList.length + 1}}</td>
                                <td><input class="form-control" placeholder="请输入圆桌会分类名称" v-model="categoryName" maxlength="15"></td>
                                <td>
                                    <div class="btn btn-primary btn-sm" @click="saveCategorySubmit">保存</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- 批量操作 删除 开始-->
    <div id="deleteConfirmMdoal" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">温馨提示</h4>
            </div>
            <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                <div class="alert alert-danger">
                    确定要删除吗？
                </div>
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" @click="categoryDeleteSubmit" class="btn btn-primary">确定</button>
            <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
            </div>
        </div>
        </div>
    </div>
    <!-- 批量操作 删除 结束-->

   </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import superConst from "../../util/super-const";
import regex from "../../util/regex";
import { quillEditor } from "vue-quill-editor";
import Quill from "quill";
import { DatePicker } from "iview";

export default {
  components: {
    vMenus,
    vTop,
    quillEditor,
    DatePicker
  },
  data() {
    return {
      title: "",
      created: "",
      description: "", //  描述
      img:'',
      imgCode:'',
      editorOption: {},
      categoryId: -1,
      categoryList: [], // 分类列表
      categoryName: '',
      categoryIndex: -1,
    }
  },
  mounted() {
    let _this = this;
    _this.SHIFT_LOADING();
    let imgHandler = async function(state) {
      if (state) {
        $("#uploadFileEdit").val(null);
        if ($("#uploadFileEdit").val()) {
          document.getElementById("uploadImgFormEdit").reset();
        }
        document.getElementById("uploadFileEdit").click();
      }
    };
    _this.$refs.myQuillEditor.quill.root.setAttribute(
      "data-placeholder",
      "请输入信息"
    );
    _this.$refs.myQuillEditor.quill
      .getModule("toolbar")
      .addHandler("image", imgHandler);
      _this.queryCategoryList()
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.description = html;
    },
    handleChange: function(date) {
      let _this = this;
      _this.created = date;
    },
    imgUploadEditFileChange: function(event) {
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
              _this.$toast.success("操作成功");
              var len = _this.$refs.myQuillEditor.quill.getLength();
              try {
                _this.$refs.myQuillEditor.quill.insertEmbed(
                  len + 1,
                  "image",
                  superConst.IMAGE_STATIC_URL + res.fileCode,
                  Quill.sources.USER
                );
              } catch (e) {
                console.error(e);
              }
            })
            .catch(err => {});
        }
      }
    },
    saveSubmit: function() {
      let _this = this
      let title = _this.title
      let categoryId = _this.categoryId
      let created = _this.created
      let description = _this.description

      if (title == "") {
        _this.$toast.warning("名称不可为空");
        return false;
      }
      if (categoryId == -1) {
        _this.$toast.warning("请选择分类")
        return false;
      }
      if (!_this.imgCode) {
        _this.$toast.warning("图片不可为空")
        return false;
      }
      if (!created) {
        created = _this.$moment().valueOf();
      } else {
        created = _this.$moment(created).valueOf();
      }

      let param = {
        title: title,
        category: categoryId,
        imageCode:_this.imgCode,
        created: created,
        description: description,
        type: "desk"
      };
      _this.PUSH_LOADING();
      _this.$axios
        .post("news", param)
        .then(result => {
          let res = result.data;
          if (res.code && res.code > 0) {
            _this.$toast.error(res.msg);
          } else {
            _this.$toast.success("操作成功");
            _this.SHIFT_LOADING();
            setTimeout(function() {
              window.location.href = "/meet/v_meet";
            }, 800);
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    showCategoryModal () {
        let _this = this
        _this.categoryName = ''
        $("#type-setting").modal('show')
        _this.queryCategoryList ()
    },
    queryCategoryList () {
        let _this = this;
        _this.PUSH_LOADING();
        _this.categoryId  = -1
        _this.$axios
            .get("newsCategory?type=desk")
            .then(result => {
                let list = result.data
                _this.$lodash.forEach(list,(item) => {
                    item.type = ''
                })
                if (list.length > 0) {
                    _this.categoryId = list[0].id
                }
                _this.categoryList = list
                _this.SHIFT_LOADING();
            })
            .catch(err => {
                _this.SHIFT_LOADING();
            });
    },
    saveCategorySubmit () {
        let _this = this
        let categoryName = _this.categoryName
        if (!categoryName){
            _this.$toast.warning("分类名称不可为空");
            return false
        }

        _this.PUSH_LOADING();
        _this.$axios
            .post("newsCategory",{
                type:'desk',
                name: categoryName
            })
            .then(result => {
                let res = result.data
                if (res.code) {
                    _this.$toast.error(res.msg);
                } else {
                    _this.$toast.success("操作成功");
                    _this.categoryName = ''
                    _this.queryCategoryList()
                }
                _this.SHIFT_LOADING();
            })
            .catch(err => {
                _this.SHIFT_LOADING();
            });
    },
    categoryEdit (index) {
        let _this = this
        let cur = _this.categoryList[index]
        if (cur) {
            cur.type = 'edit'
        }
    },
    categoryEditSave (index) {
        let _this = this
        let cur = _this.categoryList[index]
        if (cur) {
            let categoryName = cur.name
            if (!categoryName){
                _this.$toast.warning("分类名称不可为空");
                return false
            }

            _this.PUSH_LOADING();
            _this.$axios
                .put("newsCategory",{
                    id: cur.id,
                    type:'desk',
                    name: categoryName
                })
                .then(result => {
                    let res = result.data
                    if (res.code) {
                        _this.$toast.error(res.msg);
                    } else {
                        _this.$toast.success("操作成功");
                        cur.type = ''
                        _this.queryCategoryList()
                    }
                    _this.SHIFT_LOADING();
                })
                .catch(err => {
                    _this.SHIFT_LOADING();
                });
        }
    },
    showCategoryDeleteModal (index) {
        let _this = this
        _this.categoryIndex = index
        $("#deleteConfirmMdoal").modal("show")
    },
    categoryDeleteSubmit () {
        let _this = this
        let cur = _this.categoryList [_this.categoryIndex]
        if (cur) {
            _this.PUSH_LOADING();
            _this.$axios
                .delete("newsCategory?newsCategoryId=" + cur.id)
                .then(result => {
                    let res = result.data
                    if (res.code) {
                        _this.$toast.error(res.msg);
                    } else {
                        _this.$toast.success("操作成功");
                        $("#deleteConfirmMdoal").modal("hide")
                        _this.queryCategoryList()
                    }
                    _this.SHIFT_LOADING();
                })
                .catch(err => {
                    _this.SHIFT_LOADING();
                });
        }
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
              _this.img = superConst.IMAGE_STATIC_URL + res.fileCode
              _this.imgCode = res.fileCode
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
