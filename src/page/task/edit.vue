<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-context ">
          <div class="row">
          <div class="col-lg-12">
            <div class="tabs-container">
              <ul class="nav nav-tabs">
                <li  v-bind:class="{active:tabType=='base'}"><a href="javascript:;;" @click="tabChange('base')"> 项目信息</a></li>
                <li v-bind:class="{active:tabType=='info'}" v-if="task.source=='user'"><a  href="javascript:;;"  @click="tabChange('info')"> 项目资料</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane" v-bind:class="{active:tabType=='base'}">
                  <div class="panel-body">
                    <fieldset class="form-horizontal">
                      <div class="form-group" style="margin-top:10px;">
                        <label class="col-sm-2 control-label">编号:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入产品编号" maxlength="20" v-model="task.projectNo">
                        </div>
                      </div>
                      <div class="form-group" >
                        <label class="col-sm-2 control-label">标题:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" placeholder="请输入项目标题" maxlength="50" v-model="task.projectName">
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
                          <div v-for="(item,index) in imagesList" :key="index" @click.stop="uploadImage(index,$event)">
                             <div class="img-upload" >
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
                          <input type="text" class="form-control" placeholder="请输入产品数量" maxlength="5" v-model="task.projectNumber">
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
                          <button class="btn btn-primary"  v-permission="{code:'project_insert'}" type="button" @click="submit">发布</button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div v-if="task.source=='user'" class="tab-pane" v-bind:class="{active:tabType=='info'}">
                  <div class="panel-body">
                    <fieldset class="form-horizontal">
                        <h3>企业信息</h3>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">公司名称:</label>
                        <div class="col-sm-6">
                          <p class="form-control-static">{{apply.company}}</p>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">联系人:</label>
                        <div class="col-sm-6">
                          <p class="form-control-static">{{apply.contact}}</p>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">联系电话:</label>
                        <div class="col-sm-6">
                          <p class="form-control-static">{{apply.phone}}</p>
                        </div>
                      </div>
                        <div class="hr-line-dashed"></div>
                        <h3>项目信息</h3>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">项目名称:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">{{apply.projectName}}</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">地区:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">{{apply.area}}</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">性质:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">{{apply.properties}}</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">产品价格:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">{{apply.originPrice}}</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">平台价格:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">{{apply.price}}</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">简介:</label>
                          <div class="col-sm-6">
                            <p class="form-control-static">{{apply.intoduction}}</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">图片:</label>
                          <div class="col-sm-6">
                            <div class="img-upload" v-for="(item,index) in apply.imagesList" :key="index">
                               <img v-bind:src="item.url" v-if="item.url&&item.code" style="width:90px;height:90px;">
                            </div>
                          </div>
                        </div>
                          <div class="hr-line-dashed"></div>
                          <h3>产品概述</h3>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">产品数量:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">{{apply.projectNumber}}</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">销售周期:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static" v-if='apply.cycle==1'>1个月</p>
                              <p class="form-control-static" v-if='apply.cycle==3'>3个月</p>
                              <p class="form-control-static" v-if='apply.cycle==6'>6个月</p>
                              <p class="form-control-static" v-if='apply.cycle==12'>1年</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">项目背景:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">{{apply.context}}</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">目标客户:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">{{apply.target}}</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">优劣势:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">{{apply.superiority}}</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">产品卖点:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">{{apply.sellingPoint}}</p>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">同行竞品:</label>
                            <div class="col-sm-6">
                              <p class="form-control-static">{{apply.competitor}}</p>
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
        datePicker: ["", ""],
        imagesList:[],  //  图片列表
        editorOption: {},
        levelList:[],
        levelId:'',
        taskId:'',
        task:{
            projectNo:'',  //  项目编号
            projectName:'',   //  标题
            intoduction: "", //  简介
            projectNumber:'',     //  产品数量
            price:'',   //  赏金
            area:'',    //地区
            target:'',//   目标客户
            context:'',      //  项目背景
            description: "", //  详细介绍,
            source:'', // 来源
        },
        tabType:'base', //base : 项目基本信息， info: 项目信息
        apply:{},
    };
  },
  computed: {
    editor() {
      return this.$refs.taskQuillEditor.quill
    }
  },
  mounted() {
    let _this = this;
    _this.taskId = _this.$route.query.taskId;
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
    _this.$refs.taskQuillEditor.quill.root.setAttribute('data-placeholder', "请输入信息");
    _this.$refs.taskQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler);
    _this.initImages();
    _this.getLevelList();
    _this.getDetail();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    tabChange: function(key){
      let _this = this;
      _this.tabType = key;
      if(key=='info'){
        _this.getApplyInfo();
      }
    },
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
    getApplyInfo: function() {
       let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("projects/" + _this.taskId+'/apply')
        .then(result => {
          try {
              let res = result.data;
              // 图片处理
              if (res.images && res.images.length>0) {
                if(res.images.indexOf(',')>=0){
                    let arr = res.images.split(',')
                    _this.$lodash.forEach(arr,function(code,index){
                        res.imagesList[index] = {
                            url:  superConst.IMAGE_STATIC_URL + code,
                            code: code
                        }
                    })
                }else{
                      res.imagesList = [];
                      res.imagesList[0] = {
                          url:  superConst.IMAGE_STATIC_URL + res.images,
                          code: res.images
                      }
                }
              }
              _this.apply = res;
              _this.SHIFT_LOADING();
          } catch (error) {
            console.error(error);
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    submit: function () {
      let _this = this;
      let projectNo = _this.task.projectNo.trim();
      if(!projectNo) {
         _this.$toast.warning("编号不可为空");
        return false;
      }
      let projectName = _this.task.projectName.trim();
      if(!projectName){
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

      let projectNumber = _this.task.projectNumber+'';
      if(!regex.numberTest(projectNumber)){
          _this.$toast.warning('数量格式不正确');
          return false;
      }
      if (projectNumber == 0){
          _this.$toast.warning('数量不可为零');
          return false;
      }
      if (!_this.task.pricing) {
        _this.$toast.warning('悬赏标价不可为空');
        return false;
      }
       if (!_this.task.price) {
        _this.$toast.warning('赏金不可为空');
        return false;
      }
      // if(!regex.money(_this.task.price)){
      //     _this.$toast.warning('赏金格式不正确');
      //     return false;
      // }
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
          "id": _this.taskId,
          "projectNo":projectNo,
          "area": _this.task.area,
          "context": _this.task.context,
          "description": _this.task.description,
          "intoduction":_this.task.intoduction,
          "endDate": _this.$moment(_this.datePicker[1]).valueOf(),
          "images": imageCodes.join(','),
          "price": _this.task.price,
          "projectName": _this.task.projectName,
          "projectNumber": _this.task.projectNumber,
          "startDate":  _this.$moment(_this.datePicker[0]).valueOf(),
          "target": _this.task.target,
          "levelId":_this.levelId,
          "pricing":_this.task.pricing,
          "status":_this.task.status
        }
      _this.PUSH_LOADING();
      _this.$axios
        .put("projects",param)
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
    getDetail: function () {
      let _this = this;
      _this.PUSH_LOADING();
      _this.$axios
        .get("projects/" + _this.taskId+'?hasDesc=true')
        .then(result => {
          let res = result.data;
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
          _this.datePicker = [_this.$moment(res.startDate).format('YYYY/MM/DD'),_this.$moment(res.endDate).format('YYYY/MM/DD')];
          _this.task = res;
          _this.SHIFT_LOADING();
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
  }
};
</script>

<style>

</style>
