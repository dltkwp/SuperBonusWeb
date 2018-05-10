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
                <li class="active"><a data-toggle="tab" href="#tab-1"> 权限设置</a></li>
                <li><a data-toggle="tab" href="#tab-2"> 职位设置</a></li>
              </ul>
              <div class="tab-content">
                <div id="tab-1" class="tab-pane active">
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="btn btn-primary" data-toggle="modal" href="#add-power">新增权限</div>
                        <div class="btn btn-white" data-toggle="modal" href="#edit-power">权限管理</div>
                      </div>
                    </div>
                    <fieldset class="form-horizontal m-t-lg">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">权限名称:</label>
                        <div class="col-sm-10">
                          <div class="btn btn-danger">管理员</div>
                          <div class="btn btn-default">客服</div>
                          <div class="btn btn-default">市场</div>

                        </div>
                      </div>
                      <div class="hr-line-dashed"></div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">对应权限:</label>
                        <div class="col-sm-10">
                          <table class="table table-bordered">
                            <tbody>
                              <tr>
                                <td style="width:150px;"><label class="checkbox-inline">
                                    <input type="checkbox" value="option1" id="inlineCheckbox1">
                                    会员管理 </label></td>
                                <td>
                                  <label class="checkbox-inline w-100"> <input type="checkbox" value="option1" id="inlineCheckbox1"> 新增会员 </label> <label class="checkbox-inline w-100">
                                      <input type="checkbox" value="option2" id="inlineCheckbox2"> 编辑会员 </label> <label class="checkbox-inline w-100">
                                      <input type="checkbox" value="option3" id="inlineCheckbox3"> 删除会员 </label>
                                </td>
                              </tr>
                              <tr>
                                <td style="width:150px;"><label class="checkbox-inline">
                                    <input type="checkbox" value="option1" id="inlineCheckbox1">
                                    会员管理 </label></td>
                                <td>
                                  <label class="checkbox-inline w-100"> <input type="checkbox" value="option1" id="inlineCheckbox1"> 新增会员 </label> <label class="checkbox-inline w-100">
                                      <input type="checkbox" value="option2" id="inlineCheckbox2"> 编辑会员 </label> <label class="checkbox-inline w-100">
                                      <input type="checkbox" value="option3" id="inlineCheckbox3"> 删除会员 </label>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                <div id="tab-2" class="tab-pane ">
                  <div class="panel-body">
                    <div class="row m-b-sm">
                      <div class="col-md-12">
                        <div class="btn btn-primary" data-toggle="modal" href="#add-duty">新增职位</div>
                      </div>
                    </div>
                    <div class="table-responsive ">
                      <table class="table table-bordered table-stripped table-hover">
                        <thead>
                          <tr>
                            <th> 职位</th>
                            <th> 操作 </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                            管理员
                            </td>
                            <td>
                              <a class="btn btn-white btn-sm" data-toggle="modal" href="#duty-set">编辑</a>
                              <a class="btn btn-white btn-sm" data-toggle="modal" href="#delete-set">删除</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                        <v-empty :isShow="parentTotalPage==0"></v-empty>
                      <page v-if="parentTotalPage>0"   :total="parentTotalPage" show-total :current="parentCurrentpage" @on-change="parentCallback"></page>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>


          <div id="add-power" class="modal fade" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          <h4 class="modal-title">新增权限</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="col-lg-3 control-label">权限名称</label>
                  <div class="col-lg-8">
                    <input type="email" placeholder="请输入权限名称" class="form-control">
                  </div>

                </div>

              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>

  <div id="edit-power" class="modal fade" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          <h4 class="modal-title">新增权限</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <table class="table table-bordered table-stripped text-center">
                <thead>
                  <tr>

                    <th class="text-center"> 权限名称 </th>
                    <th class="text-center"> 操作 </th>

                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <td>
                      <input class="form-control" value="管理员">

                    </td>

                    <td>
                      <a class="btn btn-white btn-sm" href="#">删除</a>
                    </td>
                  </tr>
                  <tr>

                    <td>
                      <input class="form-control" value="客服">

                    </td>

                    <td>
                      <a class="btn btn-white btn-sm" href="#">删除</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>

  <div id="delete-set" class="modal fade" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          <h4 class="modal-title">温馨提示</h4>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger">
                                确定删除职位吗？
                            </div>
        </div>
        <div class="modal-footer">

          <button type="button" class="btn btn-primary">确定</button>
          <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
  
  <div id="add-duty" class="modal fade" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">新增职位</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="col-lg-3 control-label">职位名称</label>
                    <div class="col-lg-8">
                      <input type="email" placeholder="请输入职位名称" class="form-control">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">保存</button>
            <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
  </div>
    
  <div id="duty-set" class="modal fade" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">编辑职位</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="col-lg-3 control-label">职位名称</label>
                    <div class="col-lg-8">
                      <input type="text" placeholder="请输入职位名称" class="form-control">
                    </div>

                  </div>

                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">

            <button type="button" class="btn btn-primary">保存</button>
            <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
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
import superConst from "../../util/super-const";
import regex from "../../util/regex";
import util from "../../util/util";
import { DatePicker,Page } from "iview";


export default {
  components: {
   vMenus,
    vTop,
    vFoot,
    vEmpty,
    DatePicker,
    Page
  },
  data() {
    return {
      parentTotalPage: 0,
      parentCurrentpage: 1,
      postitionList:[],
      tabType: '',
    };
  },
  mounted() {
    let _this = this;
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING]),
    parentCallback(cPage) {
      let _this = this;
      _this.parentCurrentpage = cPage;
      _this.list();
    },
  }
};
</script>

<style>

</style>
