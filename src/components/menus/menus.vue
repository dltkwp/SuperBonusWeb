<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul class="nav metismenu" id="side-menu">
        <li class="nav-header">
          <div class="dropdown profile-element">
            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
              <span class="clear"> 
                              <span class="block m-t-xs"> <strong class="font-bold">{{userInfo.realname}}</strong></span>
              <span class="text-muted text-xs block">{{userInfo.positionName || ''}} <b class="caret"></b></span>
              </span>
            </a>
            <ul class="dropdown-menu  m-t-xs">
              <li>
                <router-link to="/user/v_index"> 个人资料 </router-link>
              </li>
              <li @click="gotoLogout"><a href="javascript:;;">退出</a></li>
            </ul>
          </div>
          <div class="logo-element">
            <div class="logo-sm"></div>
          </div>
        </li>
        <li v-bind:class="{active:parentKey==='Index'}">
          <router-link to="/v_index">
            <i class="fa fa-home"></i> <span class="nav-label">首页</span>
          </router-link>
        </li>
        <li v-bind:class="{active:parentKey==='Adv'}" >
           <a href="javascript:;;"><i class="fa fa-podcast"></i> <span class="nav-label">广告管理</span><span class="fa arrow"></span> </a>

            <ul class="nav nav-second-level collapse">
              <li v-bind:class="{active:childrenKey==='MinAdv'}">
                <router-link to="/adv/v_min">小程序广告管理</router-link>
              </li>
              <li v-bind:class="{active:childrenKey==='PcAdv'}">
                <router-link to="/adv/v_pc">PC广告管理</router-link>
              </li>
            </ul>
        </li>


        <li v-bind:class="{active:parentKey==='Task'}">
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
        <li v-bind:class="{active:parentKey==='Employee'}">
          <router-link to="/employee/v_index">
            <i class="fa fa-group"></i> <span class="nav-label">员工管理</span>
          </router-link>
        </li>
        <li v-bind:class="{active:parentKey==='Pages'}">
          <router-link to="/pages/v_index">
            <i class="fa fa fa-files-o"></i> <span class="nav-label">单页管理</span>
          </router-link>
        </li>
        <li v-bind:class="{active:parentKey==='Meet'}">
            <router-link to="/meet/v_meet">
              <i class="fa fa-trophy"></i> <span class="nav-label">圆桌会管理</span>
            </router-link>
        </li>
        <li v-bind:class="{active:parentKey==='Recruitment'}">
            <router-link to="/recruitment/v_recruitment">
              <i class="fa fa-fire"></i> <span class="nav-label">招聘管理</span>
            </router-link>
        </li>
        <li v-bind:class="{active:parentKey==='SysCfg'}">
          <a href="javascript:;;"><i class="fa fa-cog"></i> <span class="nav-label">系统设置</span><span class="fa arrow"></span> </a>
          <ul class="nav nav-second-level collapse">
            <li v-bind:class="{active:childrenKey==='Employee'}">
              <router-link to="/employee/v_config">员工设置</router-link>
            </li>
            <li v-bind:class="{active:childrenKey==='Level'}">
              <router-link to="/member/v_level">会员等级设置</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import superConst from "../../util/super-const";
  export default {
    data() {
      return {
        parentKey: "Index",
        childrenKey: "Index",
        userInfo: {}
      };
    },
    mounted() {
      let _this = this;
      let userInfo = localStorage.getItem(superConst.LOGIN_USER_INFO_KEY);
      if (!_this.$lodash.isEmpty(userInfo)) {
        let u = JSON.parse(userInfo);
        _this.userInfo = u;
      } else {
        _this.$axios
          .get("login/info")
          .then(result => {
            let res = result.data;
            localStorage.setItem(
              superConst.LOGIN_USER_INFO_KEY,
              JSON.stringify(result.data)
            );
            _this.userInfo = res;
          })
          .catch(err => {});
      }
      let meta = _this.$route.meta;
      _this.parentKey = meta.parentKey;
      _this.childrenKey = meta.childrenKey;

      setTimeout(function() {
        $("#side-menu").metisMenu();
      } ,9)
    },
    methods: {
      gotoLogout: function() {
        let _this = this;
        _this.$axios
          .get("logout")
          .then(result => {
            localStorage.setItem(superConst.SUPER_TOKEN_KEY, ""); 
            window.location.href = "/v_login";
          })
          .catch(err => {});
      }
    }
  };
</script>