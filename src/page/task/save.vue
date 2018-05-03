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
                <li class="active"><a data-toggle="tab" href="#tab-1"> 项目信息</a></li>
                <!-- <li><a data-toggle="tab" href="#tab-2"> 项目资料</a></li> -->
              </ul>
              <div class="tab-content">
                <div id="tab-1" class="tab-pane active">
                  <div class="panel-body">
                    <fieldset class="form-horizontal" style="border:none;">
                      <!-- <div class="form-group" >
                        <label class="col-sm-2 control-label">编号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入产品编号" readonly disabled maxlength="20" v-model="task.project_no">
                        </div>
                      </div> -->
                      <div class="form-group" style="margin-top:10px;">
                        <label class="col-sm-2 control-label">标题:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入项目标题" maxlength="50" v-model="task.project_name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">简介:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入项目简介" maxlength="140" v-model="task.intoduction">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">图片:</label>
                        <div class="col-sm-10">
                          <div  v-for="(item,index) in imagesList" :key="index" @click.stop="uploadImage(index,$event)">
                             <div class="img-upload">
                                <img v-bind:src="item.url" v-if="item.url&&item.code" style="width:90px;height:90px;">
                            </div>
                            <div class="btn-delete" v-if="item.url&&item.code" @click.stop="removeImage(index)">
                                <i class="fa fa-times-circle"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">产品数量:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入产品数量" maxlength="5" v-model="task.project_number">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">悬赏标价:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入悬赏标价" maxlength="250" v-model="task.pricing">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">赏金:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入项目赏金" maxlength="8" v-model="task.price">
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-2 control-label">有效期:</label>
                        <div class="col-sm-6">
                            <date-picker :editable="false" :value="datePicker" format="yyyy/MM/dd" type="daterange" placement="bottom-end" @on-change="handleChange" placeholder="请选择有效期" style="width: 200px"></date-picker>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">地区:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入项目地区" maxlength="50" v-model="task.area">
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
                        <label class="col-sm-2 control-label">目标客户:</label>
                        <div class="col-sm-6">
                          <textarea class="form-control" maxlength="140" v-model="task.target"></textarea>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">项目背景:</label>
                        <div class="col-sm-6">
                          <textarea class="form-control" maxlength="1000" v-model="task.context"></textarea>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">详细介绍:</label>
                        <div class="col-sm-10">
                          <div class="summernote">
                           <quill-editor  v-model="task.description" style="height:260px;"
                                ref="taskQuillEditor"
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
                          <button class="btn btn-primary" type="button" @click="submit">发布</button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div id="tab-2" class="tab-pane hide">
                  <div class="panel-body">
                    <fieldset class="form-horizontal">
                        <h3>企业信息</h3>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">公司名称:</label>
                        <div class="col-sm-6">
                          <p class="form-control-static">大连乐维科技有限公司</p>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">联系人:</label>
                        <div class="col-sm-6">
                          <p class="form-control-static">张三</p>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">联系电话:</label>
                        <div class="col-sm-6">
                          <p class="form-control-static">15242612898</p>
                        </div>
                      </div>
                        <div class="hr-line-dashed"></div>
                        <h3>项目信息</h3>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">项目名称:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">天津户口对外推送</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">地区:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">天津</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">性质:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">实体产品</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">产品价格:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">¥5000</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">平台价格:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">¥2000</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">简介:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">天津户口对外推荐，5个户口一共20000</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">图片:</label>
                          <div class="col-sm-6">
                            <div class="img-upload"></div>
                          </div>
                        </div>
                          <div class="hr-line-dashed"></div>
                          <h3>产品概述</h3>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">产品数量:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">5</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">销售周期:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">1个月</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">项目背景:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">项目背景描述文字</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">目标客户:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">目标客户描述</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">优劣势:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">产品优劣势描述</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">产品卖点:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">产品卖点描述</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">同行竞品:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">同行竞品描述</p>
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

   </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import vFoot from "@/components/foot/foot.vue";
import superConst from "../../util/super-const";
import regex from "../../util/regex";
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
import { DatePicker } from "iview";


export default {
  components: {
    vMenus,
    vTop,
    vFoot,
    quillEditor,
    DatePicker
  },
  data() {
    return {
        datePicker: ["", ""],
        imagesList:[],  //  图片列表
        editorOption: {},
        levelList:[],
        levelId:'',
        task:{
            project_no:'',  //  项目编号
            project_name:'',   //  标题
            intoduction: "", //  简介
            project_number:'',     //  产品数量
            price:'',   //  赏金
            area:'',    //地区
            target:'',//   目标客户
            context:'',      //  项目背景
            description: "", //  详细介绍
            pricing:'', // 悬赏价格
        }
    };
  },
  computed: {
    editor() {
      return this.$refs.taskQuillEditor.quill
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
    }
    _this.$refs.taskQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler);
    _this.initImages();
    _this.getLevelList();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    leveChange: function (levelId) {
        let _this = this;
        _this.levelId = levelId;
    },
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
    submit: function () {
      let _this = this;
      let project_name = _this.task.project_name.trim();
      if(!project_name){
         _this.$toast.warning("标题不可为空");
        return false;
      }
      let intoduction = _this.task.intoduction.trim();
      if(!intoduction){
        _this.$toast.warning('简介不可为空');
        return false;
      }

      let imageCodes = [];
      _this.$lodash.forEach(_this.imagesList,function(item){
          if(item.code){
            imageCodes.push(item.code);
          }
      });
      if(imageCodes.length == 0){
          _this.$toast.warning('至少上传一张图片');
          return false;
      }

      let project_number = _this.task.project_number+'';
      if(!regex.numberTest(project_number)){
          _this.$toast.warning('数量格式不正确');
          return false;
      }
      if (project_number == 0){
          _this.$toast.warning('数量不可为零');
          return false;
      }
      if (!_this.task.pricing) {
        _this.$toast.warning('悬赏标价不可为空');
        return false;
      }
      if(!regex.money(_this.task.price)){
          _this.$toast.warning('赏金格式不正确');
          return false;
      }
      if(!(_this.datePicker[0] + _this.datePicker[1])){
          _this.$toast.warning('请选择有效期');
          return false;
      }
      if(!_this.task.area) {
         _this.$toast.warning('地区不可为空');
        return false;
      }
      if (!_this.task.target) {
        _this.$toast.warning('目标客户不可为空');
        return false;
      }
      if (!_this.task.context) {
        _this.$toast.warning('项目背景不可为空');
        return false;
      }

      let param = {
          "area": _this.task.area,
          "context": _this.task.context,
          "description": _this.task.description,
          "intoduction":_this.task.intoduction,
          "endDate": _this.$moment(_this.datePicker[1]).valueOf(),
          "images": imageCodes.join(','),
          "price": _this.task.price,
          "projectName": _this.task.project_name,
          "projectNumber": _this.task.project_number,
          "startDate":  _this.$moment(_this.datePicker[0]).valueOf(),
          "target": _this.task.target,
          "levelId":_this.levelId,
          "pricing":_this.task.pricing
        }
      _this.PUSH_LOADING();
      _this.$axios
        .post("projects",param)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){
             _this.$toast.error(res.msg);
          }else{
            _this.$toast.success("操作成功");
            _this.SHIFT_LOADING();
            setTimeout(function() {
               window.location.href = "/task/v_index";
            }, 800);
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });

    },
    handleChange(date) {
      let _this = this;
      _this.datePicker = date;
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
              _this.$toast.success("操作成功");
              var len = _this.$refs.taskQuillEditor.quill.getLength();
              try {
                _this.$refs.taskQuillEditor.quill.insertEmbed(len + 1, 'image', superConst.IMAGE_STATIC_URL + res.fileCode , Quill.sources.USER)
              }catch(e){
                console.error(e);
              }
            })
            .catch(err => {});
        }
      }
    },
    removeImage: function (index) {
       let _this = this;
       Vue.set(_this.imagesList, index, {url:'',code:''})
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
  }
};
</script>

<style>

</style>
