<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox">
                <div class="ibox-title">圆桌会管理</div>
                <div class="ibox-content">
                    <div class="row m-b-sm ">
                    <div class="col-lg-12">
                        <div class="pull-left">
                        <a class="btn btn-primary btn-sm" href="add-news.html">新增圆桌会</a>
                        <div class="btn-group btn-group-sm">
                            <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false">批量操作 <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                            <li><a data-toggle="modal" href="#delete">删除</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="table-responsive">
                    <table class="table table-bordered table-stripped table-hover ">
                        <thead>
                        <tr>
                            <th> <div class="icheckbox_square-green" style="position: relative;"><input type="checkbox" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div> </th>
                            <th> 标题 </th>
                            <th> 分类 </th>
                            <th> 发布时间 </th>
                            <th> 发布人 </th>
                            <th> 操作 </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><div class="icheckbox_square-green" style="position: relative;"><input type="checkbox" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                            </td>
                            <td> 超级悬赏圆桌会</td>
                            <td> 圆桌会1</td>
                            <td>2018/05/01 12:20
                            </td>
                            <td> 张三</td>
                            <td>
                            <a class="btn btn-white btn-sm" href="add-news.html">查看</a>

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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/mutation-types.js";

import vMenus from "@/components/menus/menus.vue";
import vTop from "@/components/top/top.vue";
import superConst from "../../util/super-const";
import regex from "../../util/regex";

export default {
  components: {
    vMenus,
    vTop
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
