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
                  <li class="active"><a data-toggle="tab" href="#tab-1"> 页面信息</a></li>
                </ul>
                <div class="tab-content">
                  <div id="tab-1" class="tab-pane active">
                    <div class="panel-body">
                      <fieldset class="form-horizontal">
                        <div class="form-group">
                          <label class="col-sm-2 control-label">名称:</label>
                          <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="请输入页面名称" maxlength="12" v-model="title">
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
                        <div class="form-group" style=" margin-top:  82px">
                          <div class="col-sm-4 col-sm-offset-2">
                            <button class="btn btn-primary" type="buttion" @click="saveSubmit">保存</button>
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

      <form action="" id="uploadImgFormEdit" style="display:none;">
        <input type="file" name="uploadFileEdit" id="uploadFileEdit" multiple="multiple" style="display:none;" @change="imgUploadEditFileChange($event)">
      </form>

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
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
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
        created: '',
        description: "", //  描述
        editorOption: {}
    };
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
    }
    _this.$refs.myQuillEditor.quill.root.setAttribute('data-placeholder', "请输入信息");
    _this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
  },
   computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
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
    handleChange: function (date) {
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
                _this.$refs.myQuillEditor.quill.insertEmbed(len + 1, 'image', superConst.IMAGE_STATIC_URL + res.fileCode , Quill.sources.USER)
              }catch(e){
                console.error(e);
              }
            })
            .catch(err => {});
        }
      }
    },
    saveSubmit: function() {
      let _this = this;
      let title = _this.title;
      let created = _this.created;
      let description = _this.description;


      if (title == "") {
        _this.$toast.warning("名称不可为空");
        return false;
      }
      if (!created) {
        created = _this.$moment().valueOf();
      }else{
        created = _this.$moment(created).valueOf();
      }
     

      let param = {
        "title":title,
        "created":created,
        "description":description,
        "type":'custum'
      }
      _this.PUSH_LOADING();
      _this.$axios
        .post("customPages",param)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.$toast.success("操作成功");
            _this.SHIFT_LOADING();
            setTimeout(function() {
              window.location.href = "/pages/v_index";
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
