<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul class="nav metismenu" id="side-menu">
        <li class="nav-header">
          <div class="dropdown profile-element">
            <a data-toggle="dropdown" class="dropdown-toggle" href="javascript:;;"> 
              <span class="clear"> 
                <span class="block m-t-xs"> 
                  <strong class="font-bold">{{userInfo.userName}}</strong>
                </span> 
                <span class="text-muted text-xs block">{{userInfo.userType===1?'供应商':'分销商'}} <b class="caret"></b></span> </span> </a>
                <ul class="dropdown-menu animated fadeInRight m-t-xs">
                  <li><a @click="gotoLogout()" href="javascript:;;">退出</a></li>
                </ul>
          </div>
          <div class="logo-element"> KSX </div>
        </li>
        <li  v-if="uType=='supplier'||uType=='all'"  v-bind:class="{active:parentKey==='Supplier'}"> 
          <a href="javascript:;;">
            <i class="fa fa-sitemap"></i> 
            <span class="nav-label">我是供应商</span> 
            <span class="fa arrow"></span>
          </a>
          <!-- v-bind:class="{'collapse in':parentKey==='Supplier','collapse':parentKey!=='Supplier'}" -->
          <ul class="nav nav-second-level collapse in" >
            <li v-bind:class="{active:childrenKey==='SupplierOrder'}"><router-link to="/v_supplier_order">订单管理</router-link></li>
            <li v-bind:class="{active:childrenKey==='SupplierDistributor'}"><router-link to="/v_distributor">分销商管理</router-link></li>
            <li v-bind:class="{active:childrenKey==='SupplierGoods'}"><router-link to="/v_supplier_goods">商品管理</router-link></li>
            <li v-bind:class="{active:childrenKey==='DistributorLevel'}"><router-link to="/v_level">分销等级设置</router-link></li>
            <li v-bind:class="{active:childrenKey==='GoodsCategory'}"><router-link to="/v_category">商品分类设置</router-link></li>
          </ul>
        </li>
        <li  v-if="uType=='distributor'||uType=='all'"   v-bind:class="{active:parentKey==='Distributor'}"> 
          <a href="javascript:;;">
          <i class="fa fa-sitemap"></i>
          <span class="nav-label">我是分销商</span> 
          <span class="fa arrow"></span></a>
          <!-- v-bind:class="{'collapse in':parentKey==='Distributor','collapse':parentKey!=='Distributor'}" -->
          <ul class="nav nav-second-level collapse in"  >
            <li v-bind:class="{active:childrenKey==='DistributorOrder'}"><router-link to="/v_distributor_order">订单管理</router-link></li>     
            <li v-bind:class="{active:childrenKey==='DistributorCustomer'}"><router-link to="/v_distributor_customer">顾客管理</router-link></li>            
            <li v-bind:class="{active:childrenKey==='DistributorGoods'}"><router-link to="/v_distributor_goods">商品管理</router-link></li>
          </ul>
        </li>
        <li v-bind:class="{active:parentKey==='Setting'}"> <a href="javascript:;;">
          <i class="fa fa-gears"></i> 
          <span class="nav-label">设置</span> 
          <span class="fa arrow"></span></a>
          <!-- v-bind:class="{'collapse in':parentKey==='Setting','collapse':parentKey!=='Setting'}" -->
          <ul class="nav nav-second-level collapse in" >
            <li v-bind:class="{active:childrenKey==='User'}"><router-link to="/v_user">个人信息</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      parentKey: "Index",
      childrenKey: "Index",
      userInfo: {
        userName: "",
        userType: ""
      },
      uType:'', // supplier: 供应商  distributor： 分销商  all： 供应商
    };
  },
  mounted() {

    let _this = this;
    let uType = localStorage.getItem('ksx-user-type',  'distributor')
    _this.uType = uType;

    let userInfo = localStorage.getItem("ksx-user-c");
    if (!_this.$lodash.isEmpty(userInfo)) {
      let u = JSON.parse(userInfo);
      _this.userInfo.userName = u.realname;
      _this.userInfo.userType = u.userType;
    } else {
      _this.$axios
        .get("user")
        .then(result => {
          let res = result.data;
          localStorage.setItem("ksx-user-c", JSON.stringify(result.data));
          _this.userInfo.userName = res.realname;
          _this.userInfo.userType = res.userType;
        })
        .catch(err => {});
    }
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