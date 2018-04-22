<template>
     <div id="wrapper">
      <v-menus></v-menus>
      <div id="page-wrapper" class="gray-bg">
        <v-top></v-top>
       <div class="wrapper wrapper-content ">
           <div class="row">
          <div class="col-lg-12">
            <div class="ibox">
              <div class="ibox-title">会员列表</div>
              <div class="ibox-content">
                <div class="row m-b-sm ">
                  <div class="col-lg-12">
                    <div class="pull-left">
                      <a class="btn btn-primary btn-sm" href="add-member.html">新增会员</a>
                    </div>
                    <div class=" pull-right text-right">
                      <div class="btn-group btn-group-sm">
                        <button data-toggle="dropdown" class="btn btn-white dropdown-toggle" aria-expanded="false">全部 <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                          <li><a href="#">全部</a></li>
                          <li><a href="#">会员等级1</a></li>
                          <li><a href="#">会员等级2</a></li>
                          <li><a href="#">会员等级3</a></li>
                          <li><a href="#">会员等级4</a></li>
                        </ul>
                      </div>
                      <div class="search-box">
                        <div class="input-group">
                          <input type="text" placeholder="搜索会员名称或电话" class="input-sm form-control">
                          <span class="input-group-btn">
                        <button type="button" class="btn btn-sm btn-primary"> 搜索</button>
                        </span></div>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="table table-bordered table-stripped table-hover">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> 编号 </th>
                        <th> 会员 </th>
                        <th> 等级 </th>
                        <th>注册时间 </th>
                        <th>企业 </th>
                        <th>职位 </th>
                        <th>支付宝账号 </th>
                        <th> 操作 </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          001

                        </td>
                        <td> <img class="img-sm pull-left img-circle" src="img/gallery/2.jpg">
                          <div class="pull-left m-l-sm"> <a href="member-detail.html">张三<br>
                                        15100000000
                                  </a></div>
                        </td>
                        <td> 大威威客</td>
                        <td>2018/04/01</td>
                        <td>大连乐维科技有限公司</td>
                        <td>经理</td>

                        <td>15242612898</td>
                        <td>
                          <a class="btn btn-white btn-sm" href="member-detail.html">查看</a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          002
                        </td>
                        <td> <img class="img-sm pull-left img-circle" src="img/gallery/1.jpg">
                          <div class="pull-left m-l-sm"> <a href="member-detail.html">张三<br>
                                15100000000
                            </a></div>
                        </td>
                        <td> 超级大威</td>
                        <td>2018/04/01</td>
                        <td>大连乐维科技有限公司</td>
                        <td>经理</td>
                        <td>15242612898</td>
                        <td>
                          <a class="btn btn-white btn-sm" href="member-detail.html">查看</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import superConst from "../../util/super-const";
import regex from "../../util/regex";

export default {
  components: {
    vMenus,
    vTop,
    vFoot
  },
  data() {
    return {};
  },
  mounted() {
    let _this = this;
  },
  methods: {
    ...mapActions([types.LOADING.PUSH_LOADING, types.LOADING.SHIFT_LOADING])
  }
};
</script>

<style>

</style>
