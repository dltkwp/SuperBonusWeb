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
                <li v-bind:class='{active:tabType=="user"}' @click="tabChange('user')" ><a href="javascript:;;"> 个人资料</a></li>
                <li v-bind:class='{active:tabType=="pwd"}' @click="tabChange('pwd')"  ><a href="javascript:;;"> 修改密码</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane" v-bind:class='{active:tabType=="user"}' >
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
                          <div class="img-upload">
                            <div class="btn-delete"><i class="fa fa-times-circle"></i></div>
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
                          <button class="btn btn-primary" type="submit">保存</button>

                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="tab-pane" v-bind:class='{active:tabType=="pwd"}' >
                  <div class="panel-body">
                    <fieldset class="form-horizontal">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">旧密码:</label>
                        <div class="col-sm-6">
                          <input type="password" class="form-control" placeholder="请输入会员旧密码" v-model="pwd.oldPwd"  maxlength="20">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">新密码:</label>
                        <div class="col-sm-6">
                          <input type="password" class="form-control" placeholder="请输入会员新密码"  v-model="pwd.newPwd"  maxlength="20">
                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <div class="col-sm-4 col-sm-offset-2">
                          <button @click="updatePwd" class="btn btn-primary" type="button">保存</button>
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
    vFoot
  },
  data() {
    return {
      edit:{},
      pwd:{
        oldPwd:'',
        newPwd:''
      },
      tabType:'user'
    };
  },
  mounted() {
    let _this = this;
    _this.getUser();
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    updatePwd: function () {
      let _this = this;
      let oldPwd = _this.pwd.oldPwd;
      let newPwd = _this.pwd.newPwd;
      
      if(!oldPwd) {
        _this.$toast.warning("旧密码不可为空");return false;
      }
      if (!regex.pwd(newPwd)) {
        _this.$toast.warning('新密码格式不正确');
        return false;
      }

      return ;
      _this.PUSH_LOADING();
      _this.$axios
        .put("user/",param)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.SHIFT_LOADING();
            _this.$toast.success("操作成功");
            _this.pwd.oldPwd = '';
            _this.pwd.newPwd = '';
          }
        })
        .catch(err => {
          _this.SHIFT_LOADING();
        });
    },
    tabChange: function (key) {
      let _this = this;
      _this.tabType = key;
      switch (key) {
        case 'pwd': {
          _this.pwd.oldPwd = '';
          _this.pwd.newPwd = '';
        }break;      
      }
    },
    getUser: function () {
      let _this = this;
      return ;
      _this.PUSH_LOADING();
      _this.$axios
        .put("products",param)
        .then(result => {
          let res = result.data;
          if(res.code&&res.code>0){
              _this.$toast.error(res.msg);
          }else{
            _this.SHIFT_LOADING();
            _this.$toast.success("操作成功");
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
