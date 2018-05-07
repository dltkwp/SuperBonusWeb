<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                          <span class="clear"> 
                            <span class="block m-t-xs"> <strong class="font-bold">管理员</strong></span> 
                              <span class="text-muted text-xs block">客服 <b class="caret"></b></span> 
                            </span> 
                        </a>
                        <ul class="dropdown-menu  m-t-xs">
                            <li><router-link to="/user/v_index"> 个人资料 </router-link></li>
                            <li @click="gotoLogout"><a href="javascript:;;">退出</a></li>
                        </ul>
                </div>
                <div class="logo-element">
                    <div class="logo-sm"></div>
                </div>
            </li>
            <li  v-bind:class="{active:parentKey==='Index'}">
               <router-link to="/v_index"> 
                <i class="fa fa-home"></i> <span class="nav-label">首页</span>
               </router-link>
            </li>
            <li  v-bind:class="{active:parentKey==='Adv'}">
                <router-link to="/adv/v_index"> 
                  <i class="fa fa-podcast"></i> <span class="nav-label">广告管理</span>
                </router-link>
            </li>
            <li  v-bind:class="{active:parentKey==='Task'}">
                <router-link to="/task/v_index"> 
                  <i class="fa fa-globe"></i> <span class="nav-label">项目大厅</span> 
                </router-link>
            </li>
            <li v-bind:class="{active:parentKey==='Product'}">
                <router-link to="/product/v_index">
                <i class="fa fa-folder"></i> <span class="nav-label">产品管理</span>
                </router-link>
            </li>
            <li v-bind:class="{active:parentKey==='Member'}">
                <router-link to="/member/v_index"> <i class="fa fa-address-book"></i> <span class="nav-label">会员管理</span> </router-link>
            </li>
            <li v-bind:class="{active:parentKey==='Order'}">
                <router-link to="/order/v_index"> 
                  <i class="fa fa-file-text"></i> <span class="nav-label">订单管理</span>
                </router-link>
            </li>
            <!-- <li class="hide">
              <a href="merchant.html"><i class="fa fa-user-circle"></i> <span class="nav-label">商户管理</span> </a>
            </li> -->
            <li v-bind:class="{active:parentKey==='Employee'}">
                 <router-link to="/employee/v_index"> 
                  <i class="fa fa-group"></i> <span class="nav-label">员工管理</span>
                </router-link>
            </li> 
            <!-- <li class="hide">
              <a href="question.html"><i class="fa fa-pencil"></i> <span class="nav-label">常见问题</span> </a>
            </li> -->
            <!-- <li class="hide">
              <a href="opinion.html"><i class="fa fa-comment"></i> <span class="nav-label">意见反馈</span> </a>
            </li> -->
            <li  v-bind:class="{active:parentKey==='Pages'}">
                 <router-link to="/pages/v_index"> 
                  <i class="fa fa fa-files-o"></i> <span class="nav-label">单页管理</span>
                 </router-link>
            </li>
            <li v-bind:class="{active:parentKey==='SysCfg'}">
              <a href="javascript:;;"><i class="fa fa-cog"></i> <span class="nav-label">系统设置</span><span class="fa arrow"></span> </a>
              <ul class="nav nav-second-level">
                  <!-- <li><a href="set-worker.html">员工设置</a></li> -->
                  <li v-bind:class="{active:childrenKey==='Level'}"><router-link to="/member/v_level">会员等级设置</router-link></li>
              </ul>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
import superConst from '../../util/super-const'
export default {
  data() {
    return {
      parentKey: "Index",
      childrenKey: "Index",
      userInfo: {
        userName: "",
        userType: ""
      }
    };
  },
  mounted() {
    let _this = this;
    // let uType = localStorage.getItem("ksx-user-type", "distributor");
    // _this.uType = uType;

    // let userInfo = localStorage.getItem("ksx-user-c");
    // if (!_this.$lodash.isEmpty(userInfo)) {
    //   let u = JSON.parse(userInfo);
    //   _this.userInfo.userName = u.realname;
    //   _this.userInfo.userType = u.userType;
    // } else {
    //   _this.$axios
    //     .get("user")
    //     .then(result => {
    //       let res = result.data;
    //       localStorage.setItem("ksx-user-c", JSON.stringify(result.data));
    //       _this.userInfo.userName = res.realname;
    //       _this.userInfo.userType = res.userType;
    //     })
    //     .catch(err => {});
    // }
    let meta = _this.$route.meta;
    _this.parentKey = meta.parentKey;
    _this.childrenKey = meta.childrenKey;
  },
  methods: {
    gotoLogout: function() {
      let _this = this;
      _this.$axios
        .get("logout")
        .then(result => {
          localStorage.setItem(superConst.SUPER_TOKEN_KEY, ""); //清理user信息,登陆后如果为空则再次查询
          window.location.href = "/v_login";
        })
        .catch(err => {});
    }
  }
};
</script>