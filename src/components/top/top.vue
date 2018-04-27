<template>
<div class="row border-bottom  white-bg">
  <nav class="navbar navbar-static-top " role="navigation" style="margin-bottom: 0">
    <!-- <div class="navbar-header">
      <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="javascript:;;"><i class="fa fa-bars"></i> </a>
    </div> -->
    <div class="back" v-if="isShowBack">
      <a href="javascript:history.go(-1);"> <i class="fa fa-chevron-left"></i> 返回上级 </a>
    </div>
    <ul class="nav navbar-top-links navbar-right">
      <li> <a href="javascript:;;" @click="gotoLogout()"> <i class="fa fa-sign-out"></i> 退出 </a> </li>
    </ul>
  </nav>
</div>
</template>

<script>
import superConst from "../../util/super-const";
export default {
  data() {
    return {
      isShowBack:false
    };
  },
  mounted() {
    let _this = this;
    let meta = _this.$route.meta;
    _this.isShowBack = meta.isShowBack || false;
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