<template>
  <div class="row border-bottom">
    <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
      <div class="navbar-header"> <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a> </div>
      <ul class="nav navbar-top-links navbar-right">
        <li> <a href="javascript:;;" @click="gotoLogout()"> <i class="fa fa-sign-out"></i> 退出 </a> </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    gotoLogout: function() {
      let _this = this;
      _this.$axios
        .get("logout")
        .then(result => {
          localStorage.setItem("ksx-user-c", ""); //清理user信息,登陆后如果为空则再次查询
          localStorage.setItem("ksx-token-c", "");
          window.location.href = "/v_login";
        })
        .catch(err => {
        });
    }
  }
};
</script>